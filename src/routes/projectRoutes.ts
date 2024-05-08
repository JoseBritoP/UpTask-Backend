import { Router } from "express";
import { ProjectHandler } from "../handlers/project/Projects";

export const projectRouter = Router();

// Middlewares
import { postProjectCheck,putProjectCheck,checkId } from "../middleware/project";
import { authenticate } from "../middleware/auth";
import { TeamHandler } from "../handlers/team/TeamMember";

// Endpoints

projectRouter.use(authenticate);
projectRouter.get('/',ProjectHandler.GET);
projectRouter.post('/',postProjectCheck,ProjectHandler.POST);
projectRouter.get('/:id',checkId,ProjectHandler.GETBYID);
projectRouter.put('/:id',putProjectCheck,ProjectHandler.PUT);
projectRouter.patch('/:id',ProjectHandler.PATCH);
projectRouter.delete('/:id',checkId,ProjectHandler.DELETE);
// --
projectRouter.post("/:projectId/team/find",TeamHandler.FINDTEAM)
projectRouter.post("/:projectId/team/",TeamHandler.ADDTEAM)
projectRouter.get("/:projectId/team/",TeamHandler.GET)
projectRouter.delete("/:projectId/team/:userId",TeamHandler.DELETEMEMBER)