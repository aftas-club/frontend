import {Address} from "./address";
import {Time} from "@angular/common";

export interface Competition {
  id?: string;
  code?: string |null;
  title?: string |null;
  date?: Date |null;
  startTime?: Time | string;
  endTime?: Time |null | string;
  numberOfParticipants?: number|null;
  location?: string;
  address?: Address;
  amount?: number |null;
}
