import Note from "../../models/Note";
import Task from "../../models/Task";
import { TaskType } from "../../typescript/types/task";
import { User as UserType } from "../../typescript/types/user";

interface CreateNoteProps {
  content:string,
  user:UserType,
  task:TaskType
}

export const createNote = async ({content,task,user}:CreateNoteProps) => {

  const note = new Note({
    content  
  });

  const taskDetail = await Task.findById(task._id);
  if(!taskDetail) throw new Error('Task not found'); 
  note.createdBy = user.id;
  note.task = task.id;

  taskDetail.notes.push(note._id);
  const [ savedNote,_ ] = await Promise.allSettled([note.save(),taskDetail.save()])

  return {
    message:'Note created successfully',
    note:savedNote
  }
};
