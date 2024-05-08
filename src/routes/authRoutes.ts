import { Router } from "express";
import { AuthHandler } from "../handlers/auth/Auth";
// Handlers

export const authRouter = Router();

// Middleware
import { createAccountMiddleware,authLoginMiddleware, authenticate } from "../middleware/auth";


// Endpoints

authRouter.get('/confirm-account/:token',AuthHandler.GETCONFIRMACCOUNT);
authRouter.get('/validate-token/:token',AuthHandler.VALIDATETOKEN)
authRouter.post('/update-password/:token',AuthHandler.UPDATEPASSWORD);
authRouter.post('/create-account',createAccountMiddleware,AuthHandler.POSTREGISTER);
authRouter.post('/login',authLoginMiddleware,AuthHandler.POSTLOGIN);
authRouter.post('/request-code',AuthHandler.REQUESTCODE);
authRouter.post('/forgot-password',AuthHandler.FORGETPASSWORD)
authRouter.delete('/:id',AuthHandler.DELETE);
authRouter.get('/user',authenticate,AuthHandler.GET);

// Profile
authRouter.put('/user/profile/:profileId',authenticate,AuthHandler.PUT);
authRouter.patch('/user/profile/:profileId',authenticate,AuthHandler.PATCH);
authRouter.post('/user/profile/check-password',authenticate,AuthHandler.CHECKPASSWORD);
authRouter.delete('/user/profile/delete',authenticate,AuthHandler.DELETEACCOUNT);