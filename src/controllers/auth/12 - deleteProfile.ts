import User from "../../models/User";

export const deleteProfile = async(userId:string) => {

  const user = await User.findByIdAndDelete(userId);

  if(!user) throw new Error(`User not found`);
  return {
    message:'Profile was deleted successfully',
    user
  }
};