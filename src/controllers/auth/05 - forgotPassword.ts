import Token from "../../models/Token";
import User from "../../models/User";
import { generateToken } from "../../utils/token";
import { AuthEmail } from "../../emails/AuthEmail";

export const forgotPassword = async (data:{email:string}) => {
  const user = await User.findOne({email:data.email});
  if(!user) throw new Error(`The email was not registered`)

  const token = new Token();
  token.token = generateToken();
  token.user = user.id
  AuthEmail.sendChangePassword({email:user.email,name:user.name,token:token.token})
 
  await Promise.allSettled([user.save(),token.save()])
  return {
    message:'Check your email to reset your password'
  }
}