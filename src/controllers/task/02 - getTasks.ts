import Task from "../../models/Task";

export const getTasks = async () => {
  const tasks = await Task.find();
  if(!tasks.length) throw new Error(`No tasks`);

  return tasks
};

export const getTasksInProject = async (projectId:string) => {
  const tasks = await Task.find({
    project:projectId
  })
  .populate('project')
  if(!tasks.length) throw new Error(`No tasks`);
  
  return tasks

}; 

export const getTask = async (id:string) => {
  const task = await Task.findById(id)
  .populate({
    path:'completedBy',
    select: 'user status',
    populate:{
      path:'user',
      select:'id name email'
    }
  })
  .populate({
    path:'notes',
    select:'_id content createdBy createdAt updatedAt task',
    populate:{
      path:'createdBy',
      select:'_id name email'
    }
  });
  if(!task) throw new Error(`Task not found ${id}`);
  return task
};