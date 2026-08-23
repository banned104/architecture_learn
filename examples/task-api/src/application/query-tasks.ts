import type { Task } from "../domain/task.js";
import { TaskNotFoundError } from "./errors.js";
import type { TaskRepository } from "./task-repository.js";

export function makeGetTask(repository: TaskRepository) {
  return async function execute(taskId: string): Promise<Task> {
    const task = await repository.findById(taskId);
    if (task === undefined) {
      throw new TaskNotFoundError(taskId);
    }
    return task;
  };
}

export function makeListTasks(repository: TaskRepository) {
  return async function execute(): Promise<readonly Task[]> {
    return repository.list();
  };
}
