import { GET,DELETEMEMBER,GETBYID,PATCH,FINDTEAM,PUT,ADDTEAM } from "./teammember.functions"

export class TeamHandler {
  static GET = GET
  static GETBYID = GETBYID
  static FINDTEAM = FINDTEAM
  static ADDTEAM = ADDTEAM
  static PUT = PUT
  static PATCH = PATCH
  static DELETEMEMBER = DELETEMEMBER
}