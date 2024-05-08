import { Document,Types } from "mongoose";
import { taskStatus } from "../../models/Task";

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]
export type TaskType = Document & {
  name:string
  description:string
  project: Types.ObjectId,
  completedBy:{
    user:Types.ObjectId,
    status:TaskStatus
  }[]
  notes:Types.ObjectId[]
}
