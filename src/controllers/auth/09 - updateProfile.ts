import User from "../../models/User";

interface UpdateProfileProps {
  profileId:string,
  data:{
    name:string
    email:string
  }
}
export const updateProfile = async ({profileId,data}:UpdateProfileProps) => {

  const profile = await User.findById(profileId);
  if(!profile) throw new Error('Profile not exist');

  const userExist = await User.findOne({email:data.email})
  if(userExist && userExist.id.toString() !== profile.id.toString()) throw new Error('Email already use')

  profile.name = data.name ? data.name : profile.name
  profile.email = data.email ? data.email : profile.email

  await profile.save()

  return {
    message:'Profile updated successfully',
    profile
  }
};