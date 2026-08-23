import { createTask, type Task } from "../domain/task.js";
import type { TaskRepository } from "./task-repository.js";

export interface CreateTaskDependencies {
  readonly repository: TaskRepository;
  readonly newId: () => string;
  readonly now: () => string;
}

export interface CreateTaskInput {
  readonly title?: string;
}

export function makeCreateTask(dependencies: CreateTaskDependencies) {
  return async function execute(input: CreateTaskInput): Promise<Task> {
    const task = createTask(
      input.title,
      dependencies.newId(),
      dependencies.now(),
    );

    await dependencies.repository.save(task);
    return task;
  };
}
