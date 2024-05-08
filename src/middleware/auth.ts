import type { Request,Response,NextFunction } from "express";
import { AuthAccount, authLoginSchema, authSchema } from "../schema/auth";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import User from "../models/User";
import { User as UserType } from "../typescript/types/user";

declare global {
  namespace Express {
    interface Request {
      body:AuthAccount,
      user:UserType
    }
  }
}

export const createAccountMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = authSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error))
    req.body = result.data
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
};

export const authLoginMiddleware = (req:Request,res:Response,next:NextFunction) => {
  try {
    const body = req.body;
    const result = authLoginSchema.safeParse(body);
    if(!result.success) throw new Error(JSON.stringify(result.error));
    req.body=result.data;
    next();
  } catch (error:any) {
    return res.status(400).json({error:JSON.parse(error.message)})
  }
}

export const authenticate = async (req:Request,res:Response,next:NextFunction) => {
  try {
    if(!req.headers.authorization === undefined || req.headers.authorization?.split(' ')[1] === undefined) throw new Error(`Unauthorized`)
    const token = req.headers.authorization?.split(' ')[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET!)
    if(typeof decoded === 'object' && decoded.id){
      const user = await User.findById(decoded.id).select('_id name email')
      if(!user) throw new Error('Unauthenticate')
      req.user = user
      if(!user) throw new Error(`Invalid token`)
    }
    next();
  } catch (error:any) {
    return res.status(401).json({error:error.message})
  }
};