import { createTask } from "./01 - createTask";
import { getTasks,getTasksInProject,getTask } from "./02 - getTasks";
import { updateTask } from "./03 - updateTask";
import { deleteTask } from "./04 - deleteTask";
import { updateTaskStatus } from "./03 - updateTask";

// TODO: Middleware hasAuth

export {
  createTask,getTasks,getTasksInProject,getTask,updateTask,deleteTask,updateTaskStatus
}