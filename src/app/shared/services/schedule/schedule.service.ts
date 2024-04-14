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

  public getScheduleForCourse(courseId: number) {
    //TODO: implement api calling
    this.scheduleSubject.next([]);
  }

  public addScheduleForGroup(schedule: Schedule) {
    // TODO: This should be done on successful response from api, remve setting id
    const currentSchedules = this.scheduleSubject.getValue();
    schedule.id = currentSchedules.length + 1;
    const newSchedules = [...currentSchedules];
    newSchedules.push(schedule);
    this.scheduleSubject.next(newSchedules);
  }

  public updateSchedule(changedSchedule: Schedule) {
    // TODO: This should be done on successful response from api
    const currentSchedules = this.scheduleSubject.getValue();
    const indexToUpdate = currentSchedules.findIndex(
      (schedule) => schedule.id === changedSchedule.id
    );
    currentSchedules[indexToUpdate] = {
      ...currentSchedules[indexToUpdate],
      ...changedSchedule,
    };
    this.scheduleSubject.next(currentSchedules);
  }

  public removeSchedule(id: number) {
     // TODO: This should be done on suscces response from api
     this.scheduleSubject.next(this.scheduleSubject.getValue().filter(schedule => schedule.id !== id));
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
