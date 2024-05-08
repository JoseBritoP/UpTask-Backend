import Note from "../../models/Note";

export const getNotes = async (taskId:string)=>{

  const notes = await Note.find({
    task:taskId
  });

  if(!notes.length) throw new Error(`This task not have notes`);

  return notes
}