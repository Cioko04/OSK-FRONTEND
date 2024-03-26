import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  private scheduleSubject = new BehaviorSubject<Schedule[]>([]);
  scheduleSubject$ = this.scheduleSubject.asObservable();

  constructor() {}

  getScheduleForGroup(groupId: number) {
    //TODO: implement api calling
    this.scheduleSubject.next([]);
  }

  addScheduleForGroup(schedule: Schedule) {
    // TODO: This should be done on successful response from api, remve setting id
    const currentSchedules = this.scheduleSubject.getValue();
    schedule.id = currentSchedules.length + 1;
    const newSchedules = [...currentSchedules];
    newSchedules.push(schedule);
    this.scheduleSubject.next(newSchedules);
  }

  public isDateBetween(
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
