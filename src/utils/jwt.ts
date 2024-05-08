import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Types } from 'mongoose'

interface Props {
  id:Types.ObjectId,
  email:string
}
export const generateJWT = (payload:Props) =>{
  const token = jwt.sign(payload,process.env.JWT_SECRET!,{
    expiresIn:'180d'
  })
  return token
}