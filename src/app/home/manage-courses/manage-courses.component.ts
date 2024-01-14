import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HeadArray, List } from 'src/app/shared/core/list';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { UserService } from 'src/app/shared/services/user/user.service';

export interface CardContent {
  title: string;
  class: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
})
export class ManageCoursesComponent implements OnInit {
  schoolId?: number;

  cardsContentArray: CardContent[] = [
    { title: 'Kursanci', class: 'students', icon: 'fa-users', count: 1 },
    { title: 'Instruktorzy', class: 'instructors', icon: 'fa-users', count: 1 },
    {
      title: 'Trwające kursy',
      class: 'ongoing-courses',
      icon: 'fa-refresh',
      count: 1,
    },
    {
      title: 'Zakończone kursy',
      class: 'completed-courses',
      icon: 'fa-graduation-cap',
      count: 1,
    },
  ];

  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {}

  setSchoolId() {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.schoolId = user.schoolRequest!.id;
        this.setInstructorCount();
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
    });
  }

  private setInstructorCount() {
    this.instructorService
      .countInstructorsBySchoolId(this.schoolId!)
      .subscribe({
        next: (count) => (this.cardsContentArray[1].count = count),
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {},
      });
  }
}
