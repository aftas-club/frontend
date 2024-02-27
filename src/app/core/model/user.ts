import {Address} from "./address";
import {Gender} from "../enum/gender";
import {UserStatus} from "../enum/user-status";
import {Role} from "../enum/role";
import {AbstractResponse} from "./abstract-response";

/**
 * Data Transfer Object (DTO) representing user-related responses.
 * This class is designed to carry user-related information in a format suitable for response payloads.
 */
export interface User extends AbstractResponse {
  firstname: string;
  lastname?: string;
  email: string;
  image?: string;
  phoneNumber: string;
  gender: Gender;
  status: UserStatus;
  address: Address;
  role: Role;
  enabled: boolean;
}
