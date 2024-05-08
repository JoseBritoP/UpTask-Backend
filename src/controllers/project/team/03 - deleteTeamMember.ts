import Project from "../../../models/Project";
import User from "../../../models/User";

export const deleteTeamMember = async (data:any) =>{
  const project = await Project.findById(data.projectId);
  if(!project) throw new Error(`Project not found`);

  const user = await User.findById(data.userId).select('id');
  if(!user) throw new Error(`User not found`)

  if(!project.team.includes(user.id)) throw new Error(`The user is already deleted`)
  project.team = project.team.filter((teamId)=> teamId.toString() !== user.id.toString());
  await project.save();

  return {
    message:'The user was deleted successfully of the team'
  }
};