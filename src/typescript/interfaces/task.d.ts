import { TaskStatus } from "../types/task"

export interface CreateTaskProps {
  name:string
  description:string
  project:string,
  userId:string
}

export interface UpdateTaskProps {
  id:string
  data:{
    name?:string
    description?:string
    status?:TaskStatus,
    userId:string
  }
}

export interface PatchTaskProps {
  id:string,
  data:{
    userId:string
    status:TaskStatus
  }
}