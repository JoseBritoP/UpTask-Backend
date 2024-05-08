import type { Request,Response } from "express";
import { confirmAccount, createAccount, loginAccount, requestConfirmationCode,forgotPassword, validateToken,getAuthUser, updateProfile, updateProfilePassword, checkProfilePassword, deleteProfile } from "../../controllers/auth";
import { updatePassword } from "../../controllers/auth/07 - updatePassword";

export const GET = async (req:Request,res:Response) => {
  const user = req.user
  try {
    const authUser = await getAuthUser(user);
    return res.status(200).json(authUser);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export const GETBYID = async (req:Request,res:Response) => {
  // const id = req.paramsId
  // try {
  //   const project = await getProject(id);
  //   return res.status(200).json(project)
  // } catch (error:any) {
  //   return res.status(404).json({error:error.message})
  // }
}

export const POSTREGISTER = async (req:Request,res:Response) => {
  const data = req.body
  try {
    const newAccount = await createAccount(data);
    return res.status(201).json(newAccount)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export const GETCONFIRMACCOUNT = async (req:Request, res:Response) => {
  const { token } = req.params
  try {
    const accountConfirmed = await confirmAccount(token);
    return res.status(200).json(accountConfirmed)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
};

export const POSTLOGIN = async (req:Request,res:Response) => {
  const data = req.body
  try {
    const login = await loginAccount(data);
    return res.status(200).json(login)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}; 

export const PUT = async (req:Request,res:Response) => {
  const data = req.body;
  const { profileId } = req.params;
  try {
    const profile = await updateProfile({profileId,data});
    return res.status(200).json(profile)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export const PATCH = async (req:Request,res:Response) => {

  const { profileId } = req.params;
  const data = req.body
  try {
    const profilePassword = await updateProfilePassword({profileId,data});
    return res.status(200).json(profilePassword)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
  
}

export const DELETE = async (req:Request,res:Response) => {
  // const id  = req.paramsId
  // try {
  //   const projectDeleted = await deleteProject(id);
  //   return res.status(200).json(projectDeleted);
  // } catch (error:any) {
  //   return res.status(404).json({error:error.message});
  // }
}

export const REQUESTCODE = async (req:Request,res:Response) => {
  const data = req.body
  try {
    const newToken = await requestConfirmationCode(data);
    return res.status(200).json(newToken)
  } catch (error:any) {
    return res.status(403).json({error:error.message})
  }
}

export const FORGETPASSWORD = async (req:Request,res:Response) => {
  const data = req.body
  try {
    const newPassword = await forgotPassword(data);
    return res.status(200).json(newPassword)
  } catch (error:any) {
    return res.status(403).json({error:error.message})
  }
};

export const VALIDATETOKEN = async (req:Request,res:Response) => {
  const { token } = req.params
  try {
    const tokenValid = await validateToken(token);
    return res.status(200).json(tokenValid)
  } catch (error:any) {
    return res.status(403).json({error:error.message})
  }
};

export const UPDATEPASSWORD = async (req:Request,res:Response) => {
  
  const { token } = req.params;
  const data = req.body
  try {
    const resetPassword = await updatePassword({token,data})
    return res.status(200).json(resetPassword)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export const CHECKPASSWORD = async (req:Request,res:Response) => {
  const userId = req.user._id
  const data = req.body
  try {
    const check = await checkProfilePassword({userId,data})
    return res.status(200).json(check)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export const DELETEACCOUNT = async (req:Request,res:Response) => {
  const userId = req.user._id;
  try {
    const user = await deleteProfile(userId);
    return res.status(200).json(user)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
};