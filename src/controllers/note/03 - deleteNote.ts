import Note from "../../models/Note";
import { TaskType } from "../../typescript/types/task";
import { User } from "../../typescript/types/user";

interface DeleteNoteProps {
  noteId:string,
  user:User,
  task:TaskType
}
export const deleteNote = async ({user,noteId,task}:DeleteNoteProps) => {
  const note = await Note.findById(noteId);

  if(!note) throw new Error('Note not found');

  if(note.createdBy.toString() !==user.id.toString()) throw new Error(`Unauthorized`);

  task.notes = task.notes.filter((note)=>note.toString() !== noteId.toString());

  await Promise.allSettled([note.deleteOne(),task.save()])

  return {
    message:'Note was deleted successfully'
  }
};