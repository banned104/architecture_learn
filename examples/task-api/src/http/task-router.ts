import { TaskNotFoundError } from "../application/errors.js";
import { TaskRuleError, type Task } from "../domain/task.js";

export interface TaskHandlers {
  readonly createTask: (input: { readonly title?: string }) => Promise<Task>;
  readonly completeTask: (taskId: string) => Promise<Task>;
  readonly getTask: (taskId: string) => Promise<Task>;
  readonly listTasks: () => Promise<readonly Task[]>;
}

export interface HttpResponse {
  readonly statusCode: number;
  readonly body: unknown;
}

interface CreateTaskBody {
  readonly title?: string;
}

function readCreateTaskBody(input: unknown): CreateTaskBody {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TaskRuleError("请求体必须是 JSON 对象");
  }

  if (!("title" in input)) {
    return {};
  }

  if (typeof input.title !== "string") {
    throw new TaskRuleError("title 必须是字符串");
  }

  return { title: input.title };
}

function matchTaskPath(pathname: string): string | undefined {
  const match = /^\/tasks\/([^/]+)$/.exec(pathname);
  return decodePathSegment(match?.[1]);
}

function matchCompletePath(pathname: string): string | undefined {
  const match = /^\/tasks\/([^/]+)\/complete$/.exec(pathname);
  return decodePathSegment(match?.[1]);
}

function decodePathSegment(segment: string | undefined): string | undefined {
  if (segment === undefined) return undefined;
  try {
    return decodeURIComponent(segment);
  } catch {
    return undefined;
  }
}

export function makeTaskRouter(handlers: TaskHandlers) {
  return async function route(
    method: string,
    pathname: string,
    body: unknown,
  ): Promise<HttpResponse> {
    try {
      if (method === "POST" && pathname === "/tasks") {
        const task = await handlers.createTask(readCreateTaskBody(body));
        return { statusCode: 201, body: task };
      }

      if (method === "GET" && pathname === "/tasks") {
        return { statusCode: 200, body: await handlers.listTasks() };
      }

      const completeId = matchCompletePath(pathname);
      if (method === "POST" && completeId !== undefined) {
        return { statusCode: 200, body: await handlers.completeTask(completeId) };
      }

      const taskId = matchTaskPath(pathname);
      if (method === "GET" && taskId !== undefined) {
        return { statusCode: 200, body: await handlers.getTask(taskId) };
      }

      return { statusCode: 404, body: { code: "ROUTE_NOT_FOUND" } };
    } catch (error: unknown) {
      if (error instanceof TaskRuleError) {
        return {
          statusCode: 400,
          body: { code: error.code, message: error.message },
        };
      }

      if (error instanceof TaskNotFoundError) {
        return {
          statusCode: 404,
          body: { code: error.code, message: error.message },
        };
      }

      return {
        statusCode: 500,
        body: { code: "INTERNAL_ERROR", message: "服务器内部错误" },
      };
    }
  };
}
