import z from 'zod';

const content = z.string({
  required_error:'The content is required',
  invalid_type_error:'The content must be a string'
})

const user = z.string()
const task = z.string();

export const NoteSchema = z.object({
  content,
  user,
  task,
});
