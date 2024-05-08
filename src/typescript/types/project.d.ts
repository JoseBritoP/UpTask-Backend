import { Document, PopulatedDoc } from "mongoose";
import { TaskType } from "./task";
import { User } from "./user";


export type ProjectType = Document & {
  projectName:string
  clientName:string
  description:string
  tasks: PopulatedDoc<TaskType & Document>[]
  manager: PopulatedDoc<User & Document>
  team:PopulatedDoc<User & Document>[]
}