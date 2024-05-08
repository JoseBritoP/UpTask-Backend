import { Document, Types, PopulatedDoc } from "mongoose";
export type NoteType = Document & {
  content:string
  createdBy:Types.ObjectId,
  task:Types.ObjectId
}

