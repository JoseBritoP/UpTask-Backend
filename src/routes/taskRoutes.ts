import { Router } from "express";
import { TaskHandler } from "../handlers/task/tasks";

const taskRouter = Router();
// Middleware

import { GetProjectId, patchTaskStatus, postTaskCheck, putTaskCheck } from "../middleware/task";
import { checkId } from "../middleware/task";

// Endpoints
taskRouter.get('/',TaskHandler.GET)
taskRouter.get('/project/:projectId',GetProjectId,TaskHandler.GET)
taskRouter.get('/:id',checkId,TaskHandler.GETBYID)
taskRouter.post('/',postTaskCheck,TaskHandler.POST)
taskRouter.put('/:id',putTaskCheck,TaskHandler.PUT)
taskRouter.patch('/:id',patchTaskStatus,TaskHandler.PATCH)
taskRouter.delete('/:id/:userId',checkId,TaskHandler.DELETE)

export default taskRouter