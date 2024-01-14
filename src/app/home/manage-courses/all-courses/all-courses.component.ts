import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { List, HeadArray } from 'src/app/shared/core/list';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CardContent } from '../manage-courses.component';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent extends List implements OnInit {
  schoolId?: number;
  courses: Course[] = [];
  updateCourse: boolean = true;
  course: Course | any;
  categoriesFromSchool: CategoryEnum[] = [];

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
    private instructorService: InstructorService,
    private router: Router
  ) {
    super(modalService);

  }

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.setSchoolId(user.schoolRequest!.id);
        this.setInstructorCount();
        this.courseService.loadCourses(this.schoolId!);
        this.loadCourses();
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
    });
  }

  onChoose(id: number) {
    this.router.navigate(['/home/manage-courses', id]);
  }

  private setSchoolId(schoolId: number) {
    this.schoolId = schoolId;
  }

  private loadCourses() {
    this.courseService.courses$.subscribe({
      next: (courses: Course[]) => {
        console.log("Courses...");
        this.courses = courses;
        this.categoriesFromSchool = courses.map(
          (course) => course.categoryType
        );
      },
      error: (error) => console.error('Error during fetching courses:' + error),
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
        this.loadCourses();
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
        this.loadCourses();
      },
      complete: () => {
        console.log('Updated!');
        this.loadCourses();
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
        this.loadCourses();
      },
    });
  }
}
