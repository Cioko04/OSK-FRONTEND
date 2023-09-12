import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HeadArray, List } from 'src/app/shared/core/list';
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
export class ManageCoursesComponent extends List implements OnInit {
  schoolId?: number;
  coursesObs: Observable<Course[]> = new Observable<Course[]>();
  updateCourse: boolean = true;
  course: Course | any;
  categoriesFromSchool: string[] = [];

  override headArray: HeadArray[] = [
    { Head: 'Kategoria', FieldName: 'categoryType' },
    { Head: 'Cena', FieldName: 'price' },
    { Head: 'Ilość kursantów', FieldName: '' },
    { Head: 'Ilość instruktorów', FieldName: 'instructorCount' },
  ];

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
    modalService: NgbModal,
    private courseService: CourseService,
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.setSchoolId();
  }

  setSchoolId() {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.schoolId = user.schoolRequest!.id;
        this.setInstructorCount();
        this.coursesObs = this.courseService.getCoursesBySchoolId(
          this.schoolId!
        );
        this.setCategoriesFromSchool();
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {},
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

  private setCategoriesFromSchool() {
    this.coursesObs.subscribe({
      next: (categories) => {
        this.categoriesFromSchool = categories.map((cat) => cat.categoryType);
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {},
    });
  }

  override onAdd(content: any) {
    this.updateCourse = false;
    this.course = {};
    super.onAdd(content);
  }

  override onEdit(content: any, course: Course) {
    this.updateCourse = true;
    this.course = course;
    super.onEdit(content, course);
  }

  override onDelete(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.ngOnInit();
      },
    });
  }

  override onSubmit(): void {
    this.updateCourse ? this.update() : this.add();
  }

  override update(): void {
    this.courseService.updateCourse(this.course).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.ngOnInit();
      },
      complete: () => {
        console.log('Updated!');
        this.ngOnInit();
      },
    });
  }

  override add(): void {
    this.course.schoolId = this.schoolId;
    this.courseService.saveCourse(this.course).subscribe({
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
