import { Router } from "express";

export const noteRouter = Router();

// Middleware
import { authenticate } from "../middleware/auth";
import { NoteHandler } from "../handlers/note/Note";
import { taskExist } from "../middleware/note";

// Endpoints

noteRouter.use(authenticate)
noteRouter.use('/:taskId',taskExist);
noteRouter.get('/:taskId/notes',NoteHandler.GET)
noteRouter.get('/:taskId/notes/:noteId',NoteHandler.GETBYID)
noteRouter.post('/:taskId/notes',NoteHandler.POST)
noteRouter.put('/:taskId/notes/:noteId',NoteHandler.PUT)
noteRouter.patch('/:taskId/notes/:noteId',NoteHandler.PATCH)
noteRouter.delete('/:taskId/notes/:noteId',NoteHandler.DELETE)