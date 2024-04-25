import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleGroup } from './schedule-group';
import { Schedule } from '../schedule/schedule';
import { ScheduleService } from '../schedule/schedule.service';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGroupService {
  private scheduleGroupsSubject = new BehaviorSubject<ScheduleGroup[]>([]);
  scheduleGroupsSubject$ = this.scheduleGroupsSubject.asObservable();

  constructor(private scheduleService: ScheduleService) {}

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
    const removedGroup = this.scheduleGroupsSubject
      .getValue()
      .find((group) => group.id === id);
    removedGroup?.schedules?.forEach((schedule) =>
      this.scheduleService.removeSchedule(schedule.id!)
    );
    this.scheduleGroupsSubject.next(
      this.scheduleGroupsSubject.getValue().filter((group) => group.id !== id)
    );
  }

  public addStudentToGroup(entity: User) {
    const currentScheduleGroups = this.scheduleGroupsSubject.getValue();
    const indexToUpdate = currentScheduleGroups.findIndex(group => entity.scheduleGroups![0].id === group.id);
    currentScheduleGroups[indexToUpdate].students!.push(entity);
    this.scheduleGroupsSubject.next(currentScheduleGroups);
  }
}
