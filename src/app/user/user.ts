import { School } from "../school/school";

export interface User {
    id?: number;
    name?: string;
    secondName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string[];
    dob?: string;
    school?: School;
  }
