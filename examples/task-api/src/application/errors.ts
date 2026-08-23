export class TaskNotFoundError extends Error {
  readonly code = "TASK_NOT_FOUND";

  constructor(readonly taskId: string) {
    super(`找不到任务：${taskId}`);
  }
}
