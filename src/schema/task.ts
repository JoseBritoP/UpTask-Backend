import z from 'zod';
import { idSchema } from './project';

const name = z.string({
  invalid_type_error:'The task name must be a string',
  required_error:'The name of the task is required',}
).trim().min(3,{message:'The name of task is to short'}).max(50,{message:'The name of task is to long'});

const description = z.string({
  invalid_type_error:'The description of the task must be a string',
  required_error:'A description is required',
}).trim().min(3,{message:'The description is to short'}).max(200,{message:'The description is to long'})

const projectIdSchema = z.string({
  invalid_type_error:'The id must be a string',
  required_error:'The id is required'
}).regex(/[^0-9]+/,{message:'Invalid ID'}).length(24,{message:'The id must have 24 characters'});

const status = z.enum(['pending','onHold','inProgress','underReview','completed']).default('pending')

export const taskSchema = z.object({
  name,
  description,
  project:projectIdSchema,
  userId:z.string()
})

export const updateTaskSchema = z.object({
  id:idSchema,
  data:z.object({
    name:name.optional(),
    description:description.optional(),
    status:status.optional(),
    userId:z.string()
  })
});

export const patchTaskStatusSchema = z.object({
  id:idSchema,
  data:z.object({
    userId:z.string(),
    status
  })
});