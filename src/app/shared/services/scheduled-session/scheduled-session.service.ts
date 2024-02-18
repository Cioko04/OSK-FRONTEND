import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { ScheduledSession } from './scheduled-session';

const SCHEDULED_SESSIONS: ScheduledSession[] = [
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
export class ScheduledSessionService {
  setOnlyOneDay: boolean = false;

  private scheduledSessionSubject = new BehaviorSubject<ScheduledSession[]>([]);
  scheduledSessionSubject$ = this.scheduledSessionSubject.asObservable();

  constructor() {}

  updateScheduledSessionSubjectForDate(dates: Date[]) {
    const startOfCurrentWeek = dates[0];
    const endOfCurrentWeek = this.setOnlyOneDay ? dates[0] : dates[6];

    const relevantScheduledSessions: ScheduledSession[] =
      SCHEDULED_SESSIONS.filter((scheduledSession) =>
        this.isDateBetween(
          scheduledSession.startDate,
          startOfCurrentWeek,
          endOfCurrentWeek
        )
      );

    this.scheduledSessionSubject.next(relevantScheduledSessions);
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
