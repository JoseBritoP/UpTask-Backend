import Token from "../../models/Token";

export const validateToken = async (token:string) => {

  const tokenExist = await Token.findOne({token});

  if(!tokenExist) throw new Error(`The token has expired, try again`);

  return {
    message:`Token valid! Reset your password`
  }
};