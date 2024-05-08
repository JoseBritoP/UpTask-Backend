import Token from "../../models/Token";
import User from "../../models/User";
import { generateToken } from "../../utils/token";
import { AuthEmail } from "../../emails/AuthEmail";

export const requestConfirmationCode = async (data:{email:string}) => {
  const user = await User.findOne({email:data.email});
  if(!user) throw new Error(`The email don't exist`)

  if(user.confirmed) throw new Error(`Your account is already confirmed!`)

  const token = new Token();
  token.token = generateToken();
  token.user = user.id
  AuthEmail.sendConfirmationEmail({email:user.email,name:user.name,token:token.token})
 
  await Promise.allSettled([user.save(),token.save()])
  return {
    message:'Check your email to confirm your account with a new token'
  }
}