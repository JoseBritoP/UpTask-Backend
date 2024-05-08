import Token from "../../models/Token";
import User from "../../models/User";
import { hashPassword } from "../../utils/auth";

interface UpdatePasswordProps {
  token:string,
  data:{
    password:string,
    repeatPassword:string
  }
}
export const updatePassword = async (data:UpdatePasswordProps) => {
  const regex = /^\d{6}$/.test(data.token);
  if(!regex) throw new Error(`Token invalid`);

  const tokenExist = await Token.findOne({token:data.token});

  if(!tokenExist) throw new Error(`The token has expired, try again`);

  const user = await User.findById(tokenExist.user);

  if(!user) throw new Error(`The user don't exist`)

  if(data.data.password !== data.data.repeatPassword) throw new Error(`The password don't match`)
  
  user.password = await hashPassword(data.data.password);

  await Promise.allSettled([user.save(),tokenExist.deleteOne()]);
  
  return {
    message:`Your password has been updated!`
  }
}