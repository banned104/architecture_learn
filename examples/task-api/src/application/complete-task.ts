import { completeTask, type Task } from "../domain/task.js";
import { TaskNotFoundError } from "./errors.js";
import type { TaskRepository } from "./task-repository.js";

export interface CompleteTaskDependencies {
  readonly repository: TaskRepository;
  readonly now: () => string;
}

export function makeCompleteTask(dependencies: CompleteTaskDependencies) {
  return async function execute(taskId: string): Promise<Task> {
    const task = await dependencies.repository.findById(taskId);
    if (task === undefined) {
      throw new TaskNotFoundError(taskId);
    }

    const completed = completeTask(task, dependencies.now());
    await dependencies.repository.save(completed);
    return completed;
  };
}
