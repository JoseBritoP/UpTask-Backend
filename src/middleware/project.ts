import type { Request,Response,NextFunction } from "express";
import { CreateProjectProps,UpdateProjectProps } from "../typescript/interfaces/project";
import { idSchema, projectSchema,updateProjectSchema } from "../schema/project";

declare global {
  namespace Express {
    interface Request {
      data:CreateProjectProps,
      updateData:UpdateProjectProps,
      paramsId:string
    }
  }
}

export const postProjectCheck = (req:Request,res:Response,next:NextFunction) =>{
  try {
    const body = req.body;
    const result = projectSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    req.data = result.data
    next();
  } catch (error:any) {
  return res.status(400).json({error:JSON.parse(error.message)})
  }
}

export const putProjectCheck = (req:Request,res:Response,next:NextFunction) =>{
  try {
    const { id } = req.params;
    const data = req.body;
    const result = updateProjectSchema.safeParse({id,data});
    if(!result.success) throw new Error(JSON.stringify(result.error))
    req.updateData = result.data
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
}

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