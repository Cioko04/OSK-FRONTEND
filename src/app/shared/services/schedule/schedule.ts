import { ScheduleGroup } from "../scheduleGroup/schedule-group";

export interface Schedule {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  scheduleGroup?: ScheduleGroup;
}
