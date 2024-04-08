import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleGroup } from './schedule-group';
import { Schedule } from '../schedule/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGroupService {
  private scheduleGroupsSubject = new BehaviorSubject<ScheduleGroup[]>([]);
  scheduleGroupsSubject$ = this.scheduleGroupsSubject.asObservable();

  constructor() {}

  public fetchScheduleGroupForCourse(courseId: number) {
    // TODO: call api for groups
    this.scheduleGroupsSubject.next([]);
  }

  public addScheduleGroup(scheduleGroup: ScheduleGroup) {
    // TODO: This should be done on suscces response from api, remve setting id
    const currentScheduleGroups = this.scheduleGroupsSubject.getValue();
    scheduleGroup.id = currentScheduleGroups.length + 1;
    const newScheduleGroups = [...currentScheduleGroups];
    newScheduleGroups.push(scheduleGroup);
    this.scheduleGroupsSubject.next(newScheduleGroups);
  }

  public addScheduleForGroup(schedule: Schedule) {
    const scheduleGroups = this.scheduleGroupsSubject.getValue();
    scheduleGroups
      .filter((group) => group.id === schedule.scheduleGroup?.id)
      .forEach((group) => group.schedules?.push(schedule));
    this.scheduleGroupsSubject.next(scheduleGroups);

    // TODO: This should be done on successful response from api, remve setting id
    // const currentSchedules = this.scheduleSubject.getValue();
    // schedule.id = currentSchedules.length + 1;
    // const newSchedules = [...currentSchedules];
    // newSchedules.push(schedule);
    // this.scheduleSubject.next(newSchedules);
  }

  public updateGroup(entity: ScheduleGroup) {
    // TODO: This should be done on suscces response from api
    const currentScheduleGroups = this.scheduleGroupsSubject.getValue();
    const indexToUpdate = currentScheduleGroups.findIndex(
      (group) => group.id === entity.id
    );
    currentScheduleGroups[indexToUpdate] = {
      ...currentScheduleGroups[indexToUpdate],
      ...entity,
    };
    this.scheduleGroupsSubject.next(currentScheduleGroups);
  }

  public removeScheduleGroup(id: number) {
    // TODO: This should be done on suscces response from api
    this.scheduleGroupsSubject.next(
      this.scheduleGroupsSubject.getValue().filter((group) => group.id !== id)
    );
  }
}
