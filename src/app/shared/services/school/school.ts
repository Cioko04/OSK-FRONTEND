import { User } from "../user/user";

export interface School {
  id: number;
  schoolName: string;
  city: string;
  zipCode: string;
  nip: string;
  addDate: string;
  userRequest: User;
}
