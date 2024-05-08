import Project from "../../../models/Project";

export const getTeamMember = async (projectId:string) => {
  const project = await Project.findById(projectId)
  .populate({
    path:'team',
    select:'_id name email'
  });

  if(!project) throw new Error(`Project not found`)

  return project.team
};