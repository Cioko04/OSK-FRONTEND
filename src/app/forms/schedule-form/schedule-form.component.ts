import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { ScheduleGroup } from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

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
export class ScheduleFormComponent extends BaseFormComponent implements OnInit {
  occurrences: string[] = Object.values(Occurrence);
  scheduleGroups: ScheduleGroup[] = [];

  constructor(
    private scheduleGroupService: ScheduleGroupService,
    private instructorService: InstructorService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      scheduleGroup: ['', [Validators.required]],
      date: ['', [Validators.required]],
      starTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      occurrence: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.setEndDate();
    this.setScheduleGroups();
    this.patchValues();
  }

  get scheduleGroup(): FormControl {
    return this.form.controls['scheduleGroup'] as FormControl;
  }

  get date(): FormControl {
    return this.form.controls['date'] as FormControl;
  }

  get starTime(): FormControl {
    return this.form.controls['starTime'] as FormControl;
  }

  get endTime(): FormControl {
    return this.form.controls['endTime'] as FormControl;
  }

  get occurrence(): FormControl {
    return this.form.controls['occurrence'] as FormControl;
  }

  override patchValues() {
    this.form.patchValue({
      scheduleGroup: this.entity.scheduleGroup,
      date: this.entity.startDate,
      starTime: this.parseTime(this.entity.startDate),
      endTime: this.parseTime(this.entity.endDate),
      occurrence: this.occurrences[0],
    });
  }

  private parseTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  override patchEntity() {
    this.entity.startDate = this.getPatchedDateWithTime(this.starTime.value);
    this.entity.endDate = this.getPatchedDateWithTime(this.endTime.value);
    this.entity.scheduleGroup = this.scheduleGroup.value;
  }

  private getPatchedDateWithTime(time: string): Date {
    const date = new Date(this.date.value);
    const fullTime = time.split(':');
    const hours = parseInt(fullTime[0], 10);
    const minutes = parseInt(fullTime[1], 10);
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
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
