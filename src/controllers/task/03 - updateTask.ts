import Project from "../../models/Project";
import Task from "../../models/Task";
import User from "../../models/User";
import { PatchTaskProps, UpdateTaskProps } from "../../typescript/interfaces/task";

export const updateTask = async ({id,data}:UpdateTaskProps) => {

  const task = await Task.findById(id);

  if(!task) throw new Error(`Task not found`)

  const project = await Project.findById(task.project)

  if(!project) throw new Error(`Project not found`);

  if(project.manager.toString() !== data.userId.toString()) throw new Error(`Unauthorized`)

  const taskUpdate = await Task.findByIdAndUpdate(id,data,{new:true})

  if(!taskUpdate) throw new Error(`Error updating the task ${id}`);
  
  const savedTask = await taskUpdate.save();
  return {
    message:'The task was successfully updated!',
    task:savedTask
  }
};

export const updateTaskStatus = async({id,data}:PatchTaskProps) => {

  const task = await Task.findById(id);

  if(!task) throw new Error(`Task not found`)

  const project = await Project.findById(task.project)

  if(!project) throw new Error(`Project not found`);

  if(project.manager.toString() !== data.userId.toString()) throw new Error(`Unauthorized`)

  const user = await User.findById(data.userId);
  if(!user) throw new Error('User not found')
  const taskUpdated = await Task.findByIdAndUpdate(id,data,{new:true})
  if(!taskUpdated) throw new Error('An error ocurred updating the status')

  const info = {
    user : user.id,
    status:data.status
  }
  taskUpdated.completedBy.push(info)
 
  await taskUpdated.save();
  return {
    message:'The status was successfully updated!',
    task:taskUpdated
  }
};