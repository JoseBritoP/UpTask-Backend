import mongoose, { Schema, Types} from 'mongoose'
import { NoteType } from '../typescript/types/note'

const NoteSchema:Schema = new Schema({
  content:{
    type:String,
    required:true,
  },
  createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true
  },
  task:{
    type:Types.ObjectId,
    ref:'Task',
    required:true
  }
},{timestamps:true})

const Note = mongoose.model<NoteType>('Note',NoteSchema);

export default Note