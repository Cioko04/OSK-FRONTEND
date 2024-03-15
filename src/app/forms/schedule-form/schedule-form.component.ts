import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

enum CourseType {
  PRACTICE = 'Praktyka',
  THEORY = 'Teoria',
}

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

  courseTypes: string[] = Object.values(CourseType);

  instructors: Instructor[] = [];
  categoryType!: CategoryEnum;

  @ViewChild('scheduleFormTemplate') scheduleFormTemplate!: TemplateRef<any>;

  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.setEndDate();
    this.setInstructors();
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

  private setInstructors() {
    this.route.paramMap.subscribe((params) => {
      this.courseService.courses$.subscribe((courses) => {
        let course = courses.find(
          (course) => course.id === parseInt(params.get('id')!)
        );
        this.instructorService.instructorSubject$.subscribe(
          (instructors) =>
            (this.instructors = instructors.filter((instructor) =>
              instructor.categories.includes(course?.categoryType!)
            ))
        );
      });
    });
  }

  getInstructorName(userRequest: any): string {
    let fullName = userRequest.name;

    if (userRequest.secondName) {
      fullName += ' ' + userRequest.secondName;
    }

    if (userRequest.lastName) {
      fullName += ' ' + userRequest.lastName;
    }

    return fullName;
  }
}
