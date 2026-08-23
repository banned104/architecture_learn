import { describe, expect, it } from "vitest";
import { completeTask, createTask, TaskRuleError } from "../src/domain/task.js";

describe("task domain", () => {
  it("trims a valid title and creates a todo task", () => {
    expect(createTask("  学习架构  ", "task-1", "2026-08-23T00:00:00Z")).toEqual({
      id: "task-1",
      title: "学习架构",
      status: "todo",
      createdAt: "2026-08-23T00:00:00Z",
    });
  });

  it("rejects an empty title", () => {
    expect(() => createTask("   ", "task-1", "now")).toThrow(TaskRuleError);
  });

  it("rejects a title longer than 100 characters", () => {
    expect(() => createTask("x".repeat(101), "task-1", "now")).toThrow(
      "任务标题不能超过 100 个字符",
    );
  });

  it("completes a task without mutating the original", () => {
    const task = createTask("学习架构", "task-1", "created");
    const completed = completeTask(task, "completed");

    expect(task.status).toBe("todo");
    expect(completed).toMatchObject({ status: "done", completedAt: "completed" });
  });

  it("keeps the original completion time when completion is repeated", () => {
    const task = completeTask(createTask("学习架构", "task-1", "created"), "first");
    expect(completeTask(task, "second").completedAt).toBe("first");
  });
});
