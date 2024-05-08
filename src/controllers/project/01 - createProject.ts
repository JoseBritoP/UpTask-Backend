import Project from "../../models/Project";
import { CreateProjectWithUserProps } from "../../typescript/interfaces/project";

export const createProject = async (data:CreateProjectWithUserProps) => {

  const { clientName, description, projectName } = data.data;
  
  const newProject = new Project({
    projectName,
    clientName,
    description
  })

  // Agree manager
  newProject.manager = data.userId

  const savedProject = await newProject.save();

  return {
    message:'Project was successfully created',  
    savedProject
  }
};