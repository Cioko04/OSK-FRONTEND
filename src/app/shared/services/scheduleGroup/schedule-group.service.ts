import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleGroup } from './schedule-group';
import { group } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGroupService {
  private scheduleGroupsSubject = new BehaviorSubject<ScheduleGroup[]>([]);
  scheduleGroupsSubject$ = this.scheduleGroupsSubject.asObservable();

  constructor() {}

  fetchScheduleGroupForCourse(courseId: number) {
    // TODO: call api for groups
    this.scheduleGroupsSubject.next([]);
  }

  addScheduleGroup(scheduleGroup: ScheduleGroup) {
    // TODO: This should be done on suscces response from api, remve setting id
    const currentScheduleGroups = this.scheduleGroupsSubject.getValue();
    scheduleGroup.id = currentScheduleGroups.length + 1;
    const newScheduleGroups = [...currentScheduleGroups];
    newScheduleGroups.push(scheduleGroup);
    this.scheduleGroupsSubject.next(newScheduleGroups);
  }

  updateGroup(entity: ScheduleGroup) {
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

  removeScheduleGroup(id: number) {
    // TODO: This should be done on suscces response from api
    this.scheduleGroupsSubject.next(this.scheduleGroupsSubject.getValue().filter(group => group.id !== id));
  }
}
