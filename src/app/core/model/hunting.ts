import {Fish} from "./fish";
import {Member} from "./member";
import {Competition} from "./competition";

export interface Hunting {
  numberOfFish: number;
  fish: Fish;
  member: Member;
  competition: Competition;
}
