import { User } from "../user/user";

export interface Instructor {
  id: number;
  schoolId: number;
  userRequest: User;
}
