import z from 'zod'

const name = z.string().min(3,{message:'The name is so short'}).max(10,{message:'The name is so long'});
const email= z.string().email({message:'Email invalid'});
const password = z.string().min(3,{message:'The password is so short'}).max(20,{message:'The password is so long'});
const repeatPassword = z.string().min(3,{message:'The repeat password is so short'}).max(20,{message:'The repeat password is so long'});
const confirmed = z.boolean().default(false);

export const emailSchema = z.object({
  email
})

export const authSchema = z.object({
  name,
  email,
  password,
  repeatPassword,
  confirmed
})

export const authLoginSchema = z.object({
  email,
  password,
})

export type AuthAccount = z.infer<typeof authSchema>
export type AuthLogin = z.infer<typeof authLoginSchema>