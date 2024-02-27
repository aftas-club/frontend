import {User} from "./user";
import {Role} from "../enum/role";

export interface ChangeRoleRequest {
  user: User;
  role: Role;
}
