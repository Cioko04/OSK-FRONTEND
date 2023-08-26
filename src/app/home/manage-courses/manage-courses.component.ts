import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HeadArray, List } from 'src/app/shared/core/list';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
})
export class ManageCoursesComponent extends List implements OnInit {
  schoolId?: number;
  coursesObs: Observable<Course[]> = new Observable<Course[]>();

  override headArray: HeadArray[] = [
    { Head: 'Kategoria', FieldName: 'categoryType' },
    { Head: 'Cena', FieldName: 'price' },
    { Head: 'Ilość kursantów', FieldName: '' },
    { Head: 'Ilość instruktorów', FieldName: '' },
  ];

  cardsContentArray = [
    { Title: 'Kursanci', Class: 'students', Icon: 'fa-users' },
    { Title: 'Instruktorzy', Class: 'instructors', Icon: 'fa-users' },
    { Title: 'Trwające kursy', Class: 'ongoing-courses', Icon: 'fa-refresh' },
    {
      Title: 'Zakończone kursy',
      Class: 'completed-courses',
      Icon: 'fa-graduation-cap',
    },
  ];

  constructor(
    modalService: NgbModal,
    private courseService: CourseService,
    private auth: AuthenticationService,
    private userService: UserService
  ) {
    super(modalService);
  }
  ngOnInit(): void {
    this.setSchoolId();
  }

  override onDelete(id: number): void {
    throw new Error('Method not implemented.');
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  override update(): void {
    throw new Error('Method not implemented.');
  }
  override add(): void {
    throw new Error('Method not implemented.');
  }

  setSchoolId() {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.schoolId = user.schoolRequest!.id;
        this.coursesObs = this.courseService.getCoursesBySchoolId(
          this.schoolId!
        );
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {},
    });
  }

  saveCourse(course: Course) {
    course.schoolId = this.schoolId;
    this.courseService.saveCourse(course).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e.status);
      },
      complete: () => {
        console.log('Course has been added!');
        this.ngOnInit();
      },
    });
  }
}
