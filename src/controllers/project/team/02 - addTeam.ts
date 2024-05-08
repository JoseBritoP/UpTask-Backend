import Project from "../../../models/Project";
import User from "../../../models/User";

export const addTeam = async(data:any) => {

  const project = await Project.findById(data.projectId);
  if(!project) throw new Error(`Project not found`);

  const user = await User.findById(data.data.id).select('id');
  if(!user) throw new Error(`User not found`)

  if(project.team.includes(user.id)) throw new Error(`The user is already added`)
  project.team.push(user.id);
  await project.save();

  return {
    message:'User has been successfully added'
  }
};