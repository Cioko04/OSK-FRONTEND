import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import {
  BaseEntityComponent,
  HeadArray,
} from 'src/app/shared/core/BaseEntityComponent';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { UserService } from 'src/app/shared/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCourseComponent
  extends BaseEntityComponent
  implements OnInit
{
  override headArray: HeadArray[] = [
    { Head: 'Intruktor', FieldName: 'userRequest' },
    { Head: 'Data rozpoczęcia', FieldName: 'userRequest' },
    { Head: 'Data zakończenia', FieldName: 'userRequest' },
    { Head: 'Typ', FieldName: 'userRequest' },
    { Head: 'Status', FieldName: 'categories' },
  ];

  formSettings: FormSettings = {
    formType: FormType.SCHEDULE,
    buttonText: 'Zapisz',
    edit: false,
    titile: '',
  };

  schedule!: Schedule;

  private course!: Course;

  constructor(
    modalService: NgbModal,
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private courseServive: CourseService
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.fetchInstructors();
    this.findCurrentCourse();
  }

  private fetchInstructors() {
    let email = this.auth.getSessionUserEmail();
    this.userService
      .getUserByEmail(email)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          let schoolId = user.schoolRequest!.id;
          this.instructorService.updateInstructorSubject(schoolId!);
        },
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {
          console.log('Instructors updated!');
        },
      });
  }

  private findCurrentCourse() {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      const courseId = +params['id'];
      this.courseServive.courses$
        .pipe(untilDestroyed(this))
        .subscribe(
          (courses) =>
            (this.course = courses.find((course) => course.id === courseId)!)
        );
    });
  }

  override onDelete(id: number): void {
    throw new Error('Method not implemented.');
  }
  override onSubmit(item: any): void {
    throw new Error('Method not implemented.');
  }
  override update(): void {
    throw new Error('Method not implemented.');
  }
  override add(): void {
    throw new Error('Method not implemented.');
  }

  addScheduleGroup(content: any) {
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.formSettings.edit = false;
    this.formSettings.titile =
      'Dodaj nową grupę dla kategorii: ' + this.course.categoryType;
      super.onAdd(content);
  }

  addSchedule(content: any, date: any) {
    this.schedule = {
      startDate: date,
    };
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = false;
    this.formSettings.titile =
      'Dodaj nowy termin kategorii: ' + this.course.categoryType;
    super.onAdd(content);
  }

  editSchedule(content: any, schedule: Schedule) {
    this.schedule = schedule;
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = true;
    this.formSettings.titile =
      'Edytuj termin kategorii: ' + this.course.categoryType;
    super.onEdit(content, schedule);
  }
}
