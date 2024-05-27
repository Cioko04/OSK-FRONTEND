import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { CardDetails } from 'src/app/shared/common/card/card.component';
import {
  BaseEntityComponent,
  HeadArray,
} from 'src/app/shared/core/BaseEntityComponent';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ModificationContent } from 'src/app/shared/utils/table/table-list/table-list.component';

@UntilDestroy()
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent extends BaseEntityComponent implements OnInit {
  schoolId?: number;
  courses: Course[] = [];
  course: Course | any;
  courseCardDetails: CardDetails[] = [];
  categoriesFromSchool: CategoryEnum[] = [];

  signInFormSettings: SignInFormSettings = {
    user: false,
    instructor: false,
    school: false,
  };

  formSettings: FormSettings = {
    formType: FormType.COURSE,
  };

  constructor(
    modalService: NgbModal,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService
      .getUserByEmail(email)
      .pipe(untilDestroyed(this))
      .subscribe({
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
    this.router.navigate(['/home/dashboard/manage-courses', id]);
  }

  private setSchoolId(schoolId: number) {
    this.schoolId = schoolId;
  }

  private loadCourses() {
    this.courseService.courses$.pipe(untilDestroyed(this)).subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
        this.courseCardDetails = this.mapCardDetails(courses);
      },
      error: (error) => console.error('Error during fetching courses:' + error),
    });
  }

  override onOpenAddForm(content: any) {
    this.formSettings.edit = false;
    this.formSettings.titile = 'Dodaj kurs';
    this.formSettings.buttonText = 'Dodaj';
    this.course = {};
    super.onOpenAddForm(content);
  }

  override onOpenEditForm(
    content: any,
    modificationContent: ModificationContent
  ) {
    this.formSettings.edit = true;
    this.formSettings.titile = 'Edytuj kurs';
    this.formSettings.buttonText = 'Zapisz';
    this.course = this.courses.find(
      (course) => course.id === modificationContent.id
    );
    super.onOpenEditForm(content);
  }

  override onDeleteEntity(deleteContent: ModificationContent): void {
    this.courseService.deleteCourse(deleteContent.id!).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.loadCourses();
      },
    });
  }

  override onFormSubmit(): void {
    this.formSettings.edit ? this.onUpdateEntity() : this.onAddEntity();
  }

  override onUpdateEntity(): void {
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

  override onAddEntity(): void {
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

  private mapCardDetails(courses: Course[]): CardDetails[] {
    return courses.map((course) => {
      return {
        sourceId: course.id!,
        label: `Kategoria  ${course.categoryType}`,
        imagePath: this.categoryService.getCategoryImagePath(
          course.categoryType
        ),
        showActionButton: true,
        aspectRatio: '8/3',
        accentColor: 'hsl(214, 80%, 40%)',
      };
    });
  }
}
