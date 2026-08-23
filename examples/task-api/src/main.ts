import { randomUUID } from "node:crypto";
import { makeCompleteTask } from "./application/complete-task.js";
import { makeCreateTask } from "./application/create-task.js";
import { makeGetTask, makeListTasks } from "./application/query-tasks.js";
import { parsePort } from "./config.js";
import { createTaskApiServer } from "./http/server.js";
import { makeTaskRouter } from "./http/task-router.js";
import { InMemoryTaskRepository } from "./infrastructure/in-memory-task-repository.js";

const repository = new InMemoryTaskRepository();
const now = () => new Date().toISOString();

const route = makeTaskRouter({
  createTask: makeCreateTask({ repository, newId: randomUUID, now }),
  completeTask: makeCompleteTask({ repository, now }),
  getTask: makeGetTask(repository),
  listTasks: makeListTasks(repository),
});

const port = parsePort(process.env.PORT);
const server = createTaskApiServer(route);

server.listen(port, () => {
  console.log(`Task API listening on http://localhost:${port}`);
});
