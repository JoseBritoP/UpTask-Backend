import type { Request,Response } from "express";
import { createProject,deleteProject,getProject,getProjects, updateProject } from "../../controllers/project";

export const GET = async (req:Request,res:Response) => {
  const user = req.user;
  try {
    const projects = await getProjects(user?.id);
    return res.status(200).json(projects);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export const GETBYID = async (req:Request,res:Response) => {
  const id = req.paramsId
  const user = req.user
  try {
    const project = await getProject(id,user?.id);
    return res.status(200).json(project)
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export const POST = async (req:Request,res:Response) => {
  const user = req.user;
  const data = req.data;
  try {
    const newProject = await createProject({userId:user?.id,data});
    return res.status(201).json(newProject)
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
}

export const PUT = async (req:Request,res:Response) => {
  const user = req.user
  const data = req.updateData;
  try {
    const projectUpdated = await updateProject(data,user?.id);
    return res.status(200).json(projectUpdated)
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
}

export const PATCH = async (req:Request,res:Response) => {
  const { id } = req.params
  
  res.json({DIY: `PATCH project ${id}`})
}

export const DELETE = async (req:Request,res:Response) => {
  const user = req.user
  const id  = req.paramsId

  try {
    const projectDeleted = await deleteProject(id,user?.id);
    return res.status(200).json(projectDeleted);
  } catch (error:any) {
    return res.status(404).json({error:error.message});
  }
}
