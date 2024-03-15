import { Course } from "../course/course";
import { Instructor } from "../instructor/instructor";
import { Schedule } from "../schedule/schedule";
import { User } from "../user/user";

export interface ScheduleGroup {
  id?: number;
  accepted?: boolean;
  type?: CourseType;
  information?: string;
  instructor?: Instructor;
  course?: Course;
  students?: User[];
  schedules?: Schedule[];
}

export enum CourseType {
  PRACTICAL = 'Praktyka',
  THEORETICAL = 'Teoria',
}
