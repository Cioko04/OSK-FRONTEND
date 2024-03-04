import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
})
export class ScheduleFormComponent implements OnInit {
  occurrences: string[] = [
    'Poniedziałek-Piątek',
    'Co tydzień',
    'Codziennie',
    'Niestandardowe',
  ];

  instructors: Instructor[] = [];
  categoryType!: CategoryEnum;

  @Input()
  schedule!: Schedule;

  @Input()
  edit!: boolean;

  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setEndDate();
    this.setInstructors();
  }

  setEndDate() {
    if (!this.schedule.endDate) {
      let date = new Date(this.schedule.startDate!);
      date.setHours(date.getHours() + 1);
      this.schedule.endDate = date;
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
