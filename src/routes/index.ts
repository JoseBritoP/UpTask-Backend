import { Request,Response,NextFunction,ErrorRequestHandler, Router } from "express";
import { projectRouter } from "./projectRoutes";
import taskRouter from "./taskRoutes";
import { authRouter } from "./authRoutes";
import { noteRouter } from "./noteRoutes";

const mainRouter = Router();

// mainRouter.use('/',(req,res)=>{
//   res.send('Hello')
// })

// Routes

mainRouter.use('/api/project',projectRouter)
mainRouter.use('/api/task',taskRouter);
mainRouter.use('/api/auth',authRouter);
mainRouter.use('/api/note',noteRouter);
mainRouter.use((req, res, next) => {
  const error:any = new Error(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`);
  error.status = 404;
  next(error);
});

mainRouter.use((error:any, req:Request, res:Response, next:NextFunction) => {
  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor'
  });
});

export default mainRouter;