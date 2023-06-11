import { School } from "../school/school";

export interface User {
    id: number;
    name: string;
    secondName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    dob: string;
    schoolRequest: School;
    categories: string[];
  }

  export enum Role {
    USER = 'USER',
    INSTRUCTOR = 'INSTRUCTOR',
    OSK_ADMIN = 'OSK_ADMIN',
    ADMIN = 'ADMIN',
  }
