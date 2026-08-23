import { describe, expect, it, vi } from "vitest";
import { makeCreateTask } from "../src/application/create-task.js";
import type { TaskRepository } from "../src/application/task-repository.js";

describe("create task use case", () => {
  it("creates and saves the same task", async () => {
    const save = vi.fn<TaskRepository["save"]>();
    const repository: TaskRepository = {
      save,
      findById: async () => undefined,
      list: async () => [],
    };
    const createTask = makeCreateTask({
      repository,
      newId: () => "task-1",
      now: () => "2026-08-23T00:00:00Z",
    });

    const task = await createTask({ title: "学习架构" });

    expect(save).toHaveBeenCalledWith(task);
    expect(task.id).toBe("task-1");
  });
});
