import { CategoryEnum } from "../category/category";

export interface Course {
  id?: number;
  price: number;
  description: string;
  schoolId?: number;
  categoryType: CategoryEnum;
  studentCount?: number;
  instructorCount?: number;
}
