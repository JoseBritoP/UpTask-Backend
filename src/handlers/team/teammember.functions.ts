import type { Request,Response } from "express";
import { createTask,getTask,getTasks,getTasksInProject,updateTask,deleteTask,updateTaskStatus } from "../../controllers/task";
import { findTeam, addTeam,deleteTeamMember,getTeamMember } from "../../controllers/project/team";

// TODO: Middleware here

export const GET = async (req:Request,res:Response) => {
  const { projectId } = req.params;
  try {
    const teamMembers = await getTeamMember(projectId)
    return res.status(200).json(teamMembers);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export const GETBYID = async (req:Request,res:Response) => {
  const id = req.paramsId
  try {
    const task = await getTask(id);
    return res.status(200).json(task)
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }

}

export const FINDTEAM = async (req:Request,res:Response) => {
  const data = req.body;
  try {
    const findMember= await findTeam(data);
    return res.status(201).json(findMember)
  } catch (error:any) {
    return res.status(400).json({error:error.message});
  }
}

export const ADDTEAM = async (req:Request,res:Response) => {
  const { projectId } = req.params;
  const data = req.body;
  try {
    const addTeamMember= await addTeam({projectId,data});
    return res.status(201).json(addTeamMember)
  } catch (error:any) {
    return res.status(400).json({error:error.message});
  }
}


export const PUT = async (req:Request,res:Response) => {
  const data = req.taskUpdateData;
  try {
    const updatedTask = await updateTask(data);
    return res.status(200).json(updatedTask)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }

}

export const PATCH = async (req:Request,res:Response) => {
  const data = req.taskStatus;
  try {
    const task = await updateTaskStatus(data);
    return res.status(200).json(task)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
  
}

export const DELETEMEMBER = async (req:Request,res:Response) => {
  const { projectId,userId } = req.params;
  try {
    const deletedMember = await deleteTeamMember({projectId,userId});
    return res.status(200).json(deletedMember);
  } catch (error:any) {
    return res.status(404).json({error:error.message});
  }

}

