import User from "../../models/User";
import { comparePassword } from "../../utils/auth";

export const checkProfilePassword = async ({userId,data}:{userId:string,data:{password:string}})=>{

  const user = await User.findById(userId);
  if(!user) throw new Error('User not exist');

  const isPasswordCorrect = await comparePassword(data.password,user.password);

  if(!isPasswordCorrect) throw new Error('Password incorrect');

  return true

};