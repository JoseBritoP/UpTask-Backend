import User from "../../../models/User"
import { emailSchema } from "../../../schema/auth"

export const findTeam = async (data:any) =>{

  const result = emailSchema.safeParse(data)
  if(!result.success) throw new Error('Email invalid')
  const email = result.data.email
  const user = await User.findOne({email:email}).select('id email name');
  if(!user) throw new Error(`User not found`)
  return user
}