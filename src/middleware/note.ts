import { Request,NextFunction,Response } from "express";
import { getTask } from "../controllers/task";
import { NoteSchema } from "../schema/note";
import { User as UserType } from "../typescript/types/user";
import { TaskType } from "../typescript/types/task";
declare global {
  namespace Express {
    interface Request {
      user:UserType,
      task:TaskType
    }
  }
}

export const taskExist = async (req:Request,res:Response,next:NextFunction) => {
  const { taskId } = req.params
  try {
    const task = await getTask(taskId);
    req.task = task
    next();
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
};

export const postNoteCheck = (req:Request,res:Response,next:NextFunction) => {
  const body = req.body;
  try {
    const result = NoteSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};