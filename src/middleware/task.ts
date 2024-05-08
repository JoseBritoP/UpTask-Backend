import type { Request,Response,NextFunction } from "express";
import { getProject } from "../controllers/project";
import { idSchema } from "../schema/project";
import { patchTaskStatusSchema, taskSchema, updateTaskSchema } from "../schema/task";
import { CreateTaskProps, PatchTaskProps, UpdateTaskProps } from "../typescript/interfaces/task";

declare global {
  namespace Express {
    interface Request {
      taskData:CreateTaskProps
      taskUpdateData:UpdateTaskProps
      taskStatus:PatchTaskProps
      
      params:{
        projectId:string
      }
    }
  }
}

export const GetProjectId = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const { projectId } = req.params
    const project = await getProject(projectId);
    req.params.projectId = project.id;
    next();
  } catch (error:any) {
    return res.status(404).json({error:error.message});
  }
};

export const checkId = (req:Request,res:Response,next:NextFunction) => {
  try {
    const { id } = req.params;

    const result = idSchema.safeParse(id);
    if(!result.success) throw new Error(JSON.stringify(result.error));
    req.paramsId = result.data
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
}

export const postTaskCheck = (req:Request,res:Response,next:NextFunction) => {
  try {
    const data = req.body;
    const result = taskSchema.safeParse(data);
    if(!result.success) throw new Error(JSON.stringify(result.error));
    req.taskData = result.data
    next();
  } catch (error:any) {
    console.log('Error creat...')
    return res.status(400).json({error:JSON.parse(error.message)});
  }
}

export const putTaskCheck = (req:Request,res:Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = updateTaskSchema.safeParse({id,data});
    if(!result.success) throw new Error(JSON.stringify(result.error));
    req.taskUpdateData = result.data
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)});
  }
};

export const patchTaskStatus = (req:Request,res:Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body

    const result = patchTaskStatusSchema.safeParse({id,data});
    if(!result.success) throw new Error(JSON.stringify(result.error));
    req.taskStatus = result.data
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)});
  }
}

export const hasAuthorization = (req:Request,res:Response,next:NextFunction) => {
  
};