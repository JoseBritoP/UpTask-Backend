import Project from "../../models/Project";

export const getProjects = async (userId:string) => {

  if(!userId) throw new Error('Unauthorized')

  const projects = await Project.find({
    $or:[
      {
        manager:{$in:userId}
      },
      {
        team:{$in:userId}
      }
    ]
  });

  if(!projects.length) throw new Error(`No projects`)

  return projects
};

export const getProject = async (id:string,userId?:string) => {

  if(/^[0-9]+$/.test(id)) throw new Error('Id invalid')

  const project = await Project.findOne({
    _id:id
  })
  .populate({
    path:'tasks',
    select:"_id name description status"
  })

  if(!project) throw new Error(`Project not found ${id}`)

  if( userId && project.manager.toString() !== userId.toString() && !project.team.includes(userId)) throw new Error('Unauthorized');
  return project
}