import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScheduleGroup } from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';

enum Occurrence {
  ONCE = 'Tylko raz',
  WHEEK = 'Poniedziałek-Piątek',
  WEEKLY = 'Co tydzień',
  DAILY = 'Codziennie',
  CUSTOM = 'Niestandardowe',
}

@UntilDestroy()
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
})
export class ScheduleFormComponent extends BaseFormComponent {
  occurrences: string[] = Object.values(Occurrence);
  scheduleGroups: ScheduleGroup[] = [];

  constructor(private scheduleGroupService: ScheduleGroupService, private instructorService: InstructorService,) {
    super();
  }

  ngOnInit() {
    this.setEndDate();
    this.setScheduleGroups();
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }

  private setScheduleGroups() {
    this.scheduleGroupService.scheduleGroupsSubject$
      .pipe(untilDestroyed(this))
      .subscribe((groups) => (this.scheduleGroups = groups));
  }

  private setEndDate() {
    if (!this.entity.endDate) {
      let date = new Date(this.entity.startDate!);
      date.setHours(date.getHours() + 1);
      this.entity.endDate = date;
    }
  }

  getInstructorName(userRequest: any): string {
    return this.instructorService.getInstructorName(userRequest);
  }
}
