import {Address} from "./address";
import {Time} from "@angular/common";

export interface Competition {
  date: Date;
  startTime: Time;
  endTime: Time;
  numberOfParticipants: number;
  location: string;
  address: Address;
  amount: number;
}
