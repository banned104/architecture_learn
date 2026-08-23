import type { TaskRepository } from "../application/task-repository.js";
import type { Task } from "../domain/task.js";

export class InMemoryTaskRepository implements TaskRepository {
  readonly #tasks = new Map<string, Task>();

  async save(task: Task): Promise<void> {
    this.#tasks.set(task.id, { ...task });
  }

  async findById(id: string): Promise<Task | undefined> {
    const task = this.#tasks.get(id);
    return task === undefined ? undefined : { ...task };
  }

  async list(): Promise<readonly Task[]> {
    return [...this.#tasks.values()].map((task) => ({ ...task }));
  }
}
