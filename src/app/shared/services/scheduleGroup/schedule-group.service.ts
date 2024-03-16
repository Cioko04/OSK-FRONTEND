import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleGroup } from './schedule-group';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGroupService {
  private scheduleGroupsSubject = new BehaviorSubject<ScheduleGroup[]>([]);
  scheduleGroupsSubject$ = this.scheduleGroupsSubject.asObservable();

  constructor() {}

  addScheduleGroup(scheduleGroup: ScheduleGroup) {
    // TODO: This should be done on suscces response from api, remve setting id
    const currentScheduleGroups = this.scheduleGroupsSubject.getValue();
    scheduleGroup.id = currentScheduleGroups.length + 1;
    const newScheduleGroups = [...currentScheduleGroups];
    newScheduleGroups.push(scheduleGroup);
    this.scheduleGroupsSubject.next(newScheduleGroups);
  }
}
