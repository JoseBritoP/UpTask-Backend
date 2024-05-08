import Task from "../../models/Task";
import { CreateTaskProps } from "../../typescript/interfaces/task";
import { getProject } from "../project";

export const createTask = async (data:CreateTaskProps) => {

  const project = await getProject(data.project);
  
  if(project.manager.toString() !== data.userId.toString()) throw new Error(`Unauthorized`);
  
  console.log(project.manager.toString() !== data.userId.toString())
  const newTask = new Task(data);
  project.tasks.push(newTask.id)
  await project.save();
  const savedTask = await newTask.save();

  return {
    message:'Task was successfully created',
    task:savedTask
  }
};