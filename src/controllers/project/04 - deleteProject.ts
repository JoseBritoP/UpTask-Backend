import Project from "../../models/Project";
import { idSchema } from "../../schema/project";

export const deleteProject = async (id:string,userId?:string) => {
  const result = idSchema.safeParse(id);
  if(!result.success) throw new Error(`ID invalid`);

  const projectDeleted = await Project.findById(id);

  if(!projectDeleted) throw new Error(`Project not found`)
  if( userId && projectDeleted.manager.toString() !== userId.toString()) throw new Error('Unauthorized');

  await projectDeleted.deleteOne();

  return {
    message:'Project was deleted successfully',
    projectDeleted
  };
};