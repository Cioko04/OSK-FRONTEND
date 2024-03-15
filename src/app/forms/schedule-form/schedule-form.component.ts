import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';



enum Occurrence {
  ONCE = 'Tylko raz',
  WHEEK = 'Poniedziałek-Piątek',
  WEEKLY = 'Co tydzień',
  DAILY = 'Codziennie',
  CUSTOM = 'Niestandardowe',
}

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
})
export class ScheduleFormComponent extends BaseFormComponent {
  occurrences: string[] = Object.values(Occurrence);

  constructor(
  ) {
    super();
  }

  ngOnInit() {
    this.setEndDate();
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }

  setEndDate() {
    if (!this.entity.endDate) {
      let date = new Date(this.entity.startDate!);
      date.setHours(date.getHours() + 1);
      this.entity.endDate = date;
    }
  }
}
