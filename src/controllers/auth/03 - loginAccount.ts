import { AuthEmail } from "../../emails/AuthEmail";
import Token from "../../models/Token";
import User from "../../models/User";
import { AuthLogin } from "../../schema/auth";
import { comparePassword } from "../../utils/auth";
import { generateJWT } from "../../utils/jwt";
import { generateToken } from "../../utils/token";

export const loginAccount = async (data:AuthLogin) => {

  const user = await User.findOne({email:data.email});
  if(!user) throw new Error(`The user don't exist`)
  if(!user.confirmed){
    const token = new Token();
    token.user = user.id
    token.token = generateToken();
    await Promise.allSettled([user.save(),token.save()])
    const emailData = {
      name:user.name,
      email:user.email,
      token:token.token
    }
    AuthEmail.sendConfirmationEmail(emailData)
    throw new Error(`Please check your email and confirm your account`)
  }

  const isPasswordCorrect = await comparePassword(data.password,user.password);
  if(!isPasswordCorrect) throw new Error(`The password is incorrect`);

  const token = generateJWT({id:user._id,email:user.email})
  return {
    message:'You are successfully logged in',
    token
  }

};