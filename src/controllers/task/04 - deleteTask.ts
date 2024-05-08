import Task from "../../models/Task";
import Project from "../../models/Project";
import User from "../../models/User";

export const deleteTask = async ({id,userId}:{id:string,userId:string}) => {

  const task = await Task.findOne({
    _id:id
  }).populate({
    path:'project',
    select:["_id","name","description"]
  });


  if(!task) throw new Error(`Task not found`);

  const project = await Project.findOne({
    _id:task.project?._id
  })
  if(!project) throw new Error(`Proyect not found`);
  const user = await User.findById(userId);
  if(!user) throw new Error(`User not found`);

  if(project.manager.toString() !== userId.toString()) throw new Error(`Unauthorized`)

  project.tasks = project.tasks.filter((task)=> task.toString() !== id)
  await project.save();

  const deletedTask = await task.deleteOne();
  return deletedTask
};