import dotenv from 'dotenv';
import app from "./app";
import { connectDB } from './config/db';
dotenv.config();

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  connectDB()
  console.log(`Server on port ${PORT}`)
})