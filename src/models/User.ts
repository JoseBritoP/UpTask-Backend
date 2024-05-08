import mongoose, { Schema, Types } from "mongoose";
import { User } from "../typescript/types/user";

const UserSchema:Schema = new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  confirmed:{
    type:Boolean,
    default:false
  },
})

const User = mongoose.model<User>('User',UserSchema);
export default User