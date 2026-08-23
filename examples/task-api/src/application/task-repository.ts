import type { Task } from "../domain/task.js";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | undefined>;
  list(): Promise<readonly Task[]>;
}
