import { Types } from "mongoose"

export interface CreateProjectProps {
  userId?:Types.ObjectId
  projectName:string
  clientName:string
  description:string
}

export interface CreateProjectWithUserProps {
  userId?:Types.ObjectId
  data:{
    projectName:string
    clientName:string
    description:string
  }
}

export interface UpdateProjectProps {
  id:string
  data:{
    projectName?:string
    clientName?:string
    description?:string
  }
}