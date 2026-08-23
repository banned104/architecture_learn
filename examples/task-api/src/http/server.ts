import { createServer, type IncomingMessage, type Server } from "node:http";
import type { HttpResponse } from "./task-router.js";

const MAX_BODY_BYTES = 64 * 1024;

class InvalidJsonBodyError extends Error {}
class BodyTooLargeError extends Error {}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) {
      throw new BodyTooLargeError("请求体过大");
    }
    chunks.push(buffer);
  }

  if (chunks.length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch (error: unknown) {
    throw new InvalidJsonBodyError("请求体不是合法 JSON", { cause: error });
  }
}

function sendJson(
  response: import("node:http").ServerResponse,
  result: HttpResponse,
): void {
  response.writeHead(result.statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(result.body));
}

export function createTaskApiServer(
  route: (
    method: string,
    pathname: string,
    body: unknown,
  ) => Promise<HttpResponse>,
): Server {
  return createServer(async (request, response) => {
    let body: unknown;
    try {
      body = request.method === "POST" ? await readJsonBody(request) : undefined;
    } catch (error: unknown) {
      if (error instanceof BodyTooLargeError) {
        sendJson(response, {
          statusCode: 413,
          body: { code: "BODY_TOO_LARGE", message: error.message },
        });
        return;
      }

      sendJson(
        response,
        error instanceof InvalidJsonBodyError
          ? {
              statusCode: 400,
              body: { code: "INVALID_JSON", message: error.message },
            }
          : {
              statusCode: 500,
              body: { code: "BODY_READ_ERROR", message: "读取请求体失败" },
            },
      );
      return;
    }

    try {
      const url = new URL(request.url ?? "/", "http://localhost");
      sendJson(response, await route(request.method ?? "GET", url.pathname, body));
    } catch {
      sendJson(response, {
        statusCode: 500,
        body: { code: "INTERNAL_ERROR", message: "服务器内部错误" },
      });
    }
  });
}
