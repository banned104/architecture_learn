interface TaskBase {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
}

export interface TodoTask extends TaskBase {
  readonly status: "todo";
}

export interface DoneTask extends TaskBase {
  readonly status: "done";
  readonly completedAt: string;
}

export type Task = TodoTask | DoneTask;

export class TaskRuleError extends Error {
  readonly code = "TASK_RULE_VIOLATION";
}

export function createTask(
  titleInput: string | undefined,
  id: string,
  createdAt: string,
): Task {
  const title = titleInput?.trim();
  if (!title) {
    throw new TaskRuleError("任务标题不能为空");
  }

  if (title.length > 100) {
    throw new TaskRuleError("任务标题不能超过 100 个字符");
  }

  return { id, title, status: "todo", createdAt };
}

export function completeTask(task: Task, completedAt: string): DoneTask {
  if (task.status === "done") {
    return task;
  }

  return { ...task, status: "done", completedAt };
}
