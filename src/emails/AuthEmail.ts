import { transport } from "../config/nodemailer"
import dotenv from 'dotenv'
dotenv.config();

interface Email {
  email:string,
  name:string,
  token:string
}
const sendConfirmationEmail = async ({email,name,token}:Email) => {
  await transport.sendMail({
    from:'UpTask <admin@uptask.com>',
    to:email,
    subject:'UpTask - Confirm your account',
    text:'UpTask - Confirm your account',
    html:`<p>Hello ${name}, almost everything is ready, you just need to confirm your account</p>
    <p>Visit the following link:</p>
    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm Account</a>
    <p>:and enter the following token: <b>${token}</b></p>
    <p>This token expires in 10 min</p>
    `
  })
}

const sendChangePassword = async ({email,name,token}:Email) => {
  await transport.sendMail({
    from:'UpTask <admin@uptask.com>',
    to:email,
    subject:'UpTask - Reset Password',
    text:'UpTask - Reset Password',
    html:`<p>Hello ${name}, you seem to have forgotten your password</p>
    <p>Please visit the following link to reset it:</p>
    <a href="${process.env.FRONTEND_URL}/auth/new-password">Confirm Account</a>
    <p>:and enter the following token: <b>${token}</b></p>
    <p>This token expires in 10 min</p>
    `
  })
}


export class AuthEmail {
  static sendConfirmationEmail = sendConfirmationEmail
  static sendChangePassword = sendChangePassword
}