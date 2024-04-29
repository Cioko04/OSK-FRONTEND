import { CourseType } from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';

export interface TableScheduleGroup {
  id?: number;
  instructor: string;
  startDate?: Date;
  endDate?: Date;
  type: CourseType;
  status?: ScheduleStatus;
  expansionPanelDetails?: ExpansionPanelDetail[];
}

enum ScheduleStatus {
  WAITING = 'Oczekujący',
  ONGOING = 'Rozpoczęty',
  FINISHED = 'Zakończony',
}
