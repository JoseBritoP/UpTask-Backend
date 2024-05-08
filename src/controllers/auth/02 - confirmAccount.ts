import Token from "../../models/Token";
import User from "../../models/User";

export const confirmAccount = async (token:string) => {

  const tokenExist = await Token.findOne({token});

  if(!tokenExist) throw new Error(`The token has expired, try again`);

  const user = await User.findById(tokenExist.user)
  if(!user) throw new Error(`User not found`)
  user.confirmed = true
  await Promise.allSettled([user.save(),tokenExist.deleteOne()])

  return {
    message:`Your account was already confirmed!`
  }
};