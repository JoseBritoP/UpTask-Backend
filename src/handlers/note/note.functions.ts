import { Request,Response } from "express";
import { createNote, deleteNote, getNotes } from "../../controllers/note";

export async function GET (req:Request,res:Response){
  const taskId = req.task._id
  try {
    const notes = await getNotes(taskId);
    return res.status(200).json(notes);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export async function GETBYID (req:Request,res:Response){
  return res.json({DIY:`Get notes`})
}

export async function POST (req:Request,res:Response){
  const user = req.user;
  const task = req.task
  const { content } = req.body;
  try {
    const newNote = await createNote({content,task,user});
    return res.status(201).json(newNote)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export async function PUT (req:Request,res:Response){
  return res.json({DIY:`Get notes`})
}
export async function PATCH (req:Request,res:Response){
  return res.json({DIY:`Get notes`})
}
export async function DELETE (req:Request,res:Response){
  const user = req.user;
  const task = req.task;
  const { noteId }= req.params
  try {
    const deletedNote = await deleteNote({user,task,noteId});
    return res.status(200).json(deletedNote);
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}