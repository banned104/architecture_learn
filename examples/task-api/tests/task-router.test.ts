import { describe, expect, it } from "vitest";
import { makeCompleteTask } from "../src/application/complete-task.js";
import { makeCreateTask } from "../src/application/create-task.js";
import { makeGetTask, makeListTasks } from "../src/application/query-tasks.js";
import { makeTaskRouter } from "../src/http/task-router.js";
import { InMemoryTaskRepository } from "../src/infrastructure/in-memory-task-repository.js";

function createRouter() {
  const repository = new InMemoryTaskRepository();
  return makeTaskRouter({
    createTask: makeCreateTask({
      repository,
      newId: () => "task-1",
      now: () => "2026-08-23T00:00:00Z",
    }),
    completeTask: makeCompleteTask({ repository, now: () => "completed" }),
    getTask: makeGetTask(repository),
    listTasks: makeListTasks(repository),
  });
}

describe("task router", () => {
  it("creates and reads a task through the HTTP boundary", async () => {
    const route = createRouter();

    expect(await route("POST", "/tasks", { title: "学习架构" })).toMatchObject({
      statusCode: 201,
      body: { id: "task-1", title: "学习架构" },
    });
    expect(await route("GET", "/tasks/task-1", undefined)).toMatchObject({
      statusCode: 200,
      body: { id: "task-1" },
    });
  });

  it("rejects a non-string title at runtime", async () => {
    const result = await createRouter()("POST", "/tasks", { title: 42 });
    expect(result).toMatchObject({
      statusCode: 400,
      body: { code: "TASK_RULE_VIOLATION" },
    });
  });

  it("returns a stable not-found error", async () => {
    const result = await createRouter()("GET", "/tasks/missing", undefined);
    expect(result).toMatchObject({
      statusCode: 404,
      body: { code: "TASK_NOT_FOUND" },
    });
  });

  it("completes a task and returns its completion state", async () => {
    const route = createRouter();
    await route("POST", "/tasks", { title: "学习架构" });

    expect(await route("POST", "/tasks/task-1/complete", undefined)).toMatchObject({
      statusCode: 200,
      body: { status: "done", completedAt: "completed" },
    });
  });

  it("treats malformed path encoding as an unmatched route", async () => {
    expect(await createRouter()("GET", "/tasks/%ZZ", undefined)).toEqual({
      statusCode: 404,
      body: { code: "ROUTE_NOT_FOUND" },
    });
  });
});
