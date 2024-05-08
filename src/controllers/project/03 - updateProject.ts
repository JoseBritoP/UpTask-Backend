import Project from "../../models/Project";
import { UpdateProjectProps } from "../../typescript/interfaces/project";

export const updateProject = async ({id,data}:UpdateProjectProps,userId?:string) => {

  const project = await Project.findById(id)
  if(!project) throw new Error(`Project not found`)
  if( userId && project.manager.toString() !== userId.toString()) throw new Error('Unauthorized');
  const updatedProject = await Project.findByIdAndUpdate(id,data,{new:true})

  if(!updatedProject) throw new Error(`Error updating the project ${id}`);
  
  const savedProject = await updatedProject.save();
  return savedProject
};
