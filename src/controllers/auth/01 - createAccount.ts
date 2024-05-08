import Token from "../../models/Token";
import User from "../../models/User";
import { AuthAccount } from "../../schema/auth";
import { hashPassword } from "../../utils/auth";
import { generateToken } from "../../utils/token";
import { AuthEmail } from "../../emails/AuthEmail";
const existEmail = async (email:string) => {
  const user = await User.findOne({email});
  if(user) throw new Error(`The email is already used`)
}
export const createAccount = async (data:AuthAccount) => {
  if(data.password !== data.repeatPassword) throw new Error(`The passwords don't match`);
  await existEmail(data.email);

  const newAccount = new User(data);
  newAccount.password = await hashPassword(data.password);

  const token = new Token();
  token.token = generateToken();
  token.user = newAccount.id
  AuthEmail.sendConfirmationEmail({email:newAccount.email,name:newAccount.name,token:token.token})
 
  const [account,newToken] = await Promise.allSettled([newAccount.save(),token.save()])
  return {
    message:'Check your email to confirm your account',
    account:account
  }
}