import User from "../../models/User";
import { User as UserType } from "../../typescript/types/user";

export const getAuthUser = async (user:UserType | undefined | null) => {

  if(!user) throw new Error('Unauthenticated');

  return user

};