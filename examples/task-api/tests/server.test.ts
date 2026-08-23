import { afterEach, describe, expect, it } from "vitest";
import { createTaskApiServer } from "../src/http/server.js";

const servers: import("node:http").Server[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) => {
    server.close(() => resolve());
  })));
});

async function startServer() {
  const server = createTaskApiServer(async () => ({ statusCode: 200, body: {} }));
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("测试服务器没有 TCP 地址");
  }
  return `http://127.0.0.1:${address.port}`;
}

describe("HTTP server boundary", () => {
  it("reports invalid JSON without calling the route", async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      body: "{broken",
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "INVALID_JSON" });
  });

  it("reports an oversized request body separately", async () => {
    const baseUrl = await startServer();
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      body: JSON.stringify({ title: "x".repeat(70_000) }),
    });

    expect(response.status).toBe(413);
    expect(await response.json()).toMatchObject({ code: "BODY_TOO_LARGE" });
  });
});
