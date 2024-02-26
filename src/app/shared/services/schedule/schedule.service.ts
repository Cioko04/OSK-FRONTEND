import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from './schedule';

const SCHEDULS: Schedule[] = [
  {
    id: 1,
    instructor: '1',
    startDate: new Date(2024, 1, 5, 12, 30),
    endDate: new Date(2024, 1, 5, 15, 0),
  },
  {
    id: 2,
    instructor: '2',
    startDate: new Date(2024, 1, 6, 9, 0),
    endDate: new Date(2024, 1, 6, 11, 30),
  },
  {
    id: 3,
    instructor: '3',
    startDate: new Date(2024, 1, 5, 9, 30),
    endDate: new Date(2024, 1, 5, 11, 0),
  },
  {
    id: 4,
    instructor: '4',
    startDate: new Date(2024, 1, 3, 9, 0),
    endDate: new Date(2024, 1, 3, 11, 30),
  },
  {
    id: 5,
    instructor: '5',
    startDate: new Date(2024, 1, 2, 12, 30),
    endDate: new Date(2024, 1, 2, 15, 0),
  },
  {
    id: 6,
    instructor: '6',
    startDate: new Date(2024, 1, 6, 12, 0),
    endDate: new Date(2024, 1, 6, 13, 30),
  },
  {
    id: 7,
    instructor: '7',
    startDate: new Date(2024, 1, 13, 12, 0),
    endDate: new Date(2024, 1, 13, 13, 30),
  },
  {
    id: 8,
    instructor: '8',
    startDate: new Date(2024, 1, 12, 9, 0),
    endDate: new Date(2024, 1, 12, 11, 30),
  },
];

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  private scheduleSubject = new BehaviorSubject<Schedule[]>([]);
  scheduleSubject$ = this.scheduleSubject.asObservable();

  constructor() {}

  updateScheduleSubjectForDate(dates: Date[]) {
    const startOfCurrentWeek = dates[0];
    const endOfCurrentWeek = dates[dates.length - 1];

    const relevantScheduledSchedules: Schedule[] =
    SCHEDULS.filter((scheduledSchedule) =>
        this.isDateBetween(
          scheduledSchedule.startDate!,
          startOfCurrentWeek,
          endOfCurrentWeek
        )
      );

    this.scheduleSubject.next(relevantScheduledSchedules);
  }

  private isDateBetween(
    targetDate: Date,
    startDate: Date,
    endDate: Date
  ): boolean {
    return (
      format(targetDate, 'yyyy-MM-dd') >= format(startDate, 'yyyy-MM-dd') &&
      format(targetDate, 'yyyy-MM-dd') <= format(endDate, 'yyyy-MM-dd')
    );
  }
}
