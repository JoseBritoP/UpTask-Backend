import User from "../../models/User";
import { comparePassword, hashPassword } from "../../utils/auth";

interface Props {
  profileId:string,
  data:{
    currentPassword:string,
    newPassword:string,
    repeatPassword:string
  }
}
export const updateProfilePassword = async ({profileId,data}:Props) => {

  if(data.currentPassword !== data.repeatPassword) throw new Error('Passwords not match')
  const user = await User.findById(profileId);
  if(!user) throw new Error('Profile no exist');
  const isPasswordCorrect = await comparePassword(data.currentPassword,user.password)

  if(!isPasswordCorrect) throw new Error('Password incorrect');

  user.password = await hashPassword(data.newPassword)

  await user.save();

  return {
    message:'The password was successfully changed!'
  }
};