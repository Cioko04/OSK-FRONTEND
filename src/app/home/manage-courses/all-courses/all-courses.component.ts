import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HeadArray, BaseEntityComponent } from 'src/app/shared/core/BaseEntityComponent';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent extends BaseEntityComponent implements OnInit {
  schoolId?: number;
  courses: Course[] = [];
  updateCourse: boolean = true;
  course: Course | any;
  categoriesFromSchool: CategoryEnum[] = [];

  override headArray: HeadArray[] = [
    { Head: 'Kategoria', FieldName: 'categoryType' },
    { Head: 'Cena', FieldName: 'price' }
  ];

  constructor(
    modalService: NgbModal,
    private courseService: CourseService,
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    super(modalService);

  }

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.setSchoolId(user.schoolRequest!.id);
        this.courseService.loadCourses(this.schoolId!);
        this.loadCourses();
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Courses loaded!');
      },
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
        this.courses = courses;
        this.categoriesFromSchool = courses.map(
          (course) => course.categoryType
        );
      },
      error: (error) => console.error('Error during fetching courses:' + error),
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
