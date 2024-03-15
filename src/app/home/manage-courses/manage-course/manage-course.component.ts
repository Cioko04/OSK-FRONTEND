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
import { ScheduleGroup } from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
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
    { Head: 'Intruktor', FieldName: 'instructor' },
    { Head: 'Data rozpoczęcia', FieldName: 'userRequest' },
    { Head: 'Data zakończenia', FieldName: 'userRequest' },
    { Head: 'Typ', FieldName: 'type' },
    { Head: 'Status', FieldName: 'accepted' },
  ];

  formSettings: FormSettings = {
    formType: FormType.SCHEDULE,
    buttonText: 'Zapisz',
    edit: false,
    titile: '',
  };

  entity!: Schedule | ScheduleGroup;
  scheduleGroups: ScheduleGroup[] = [];

  private course!: Course;

  constructor(
    modalService: NgbModal,
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private courseServive: CourseService,
    private scheduleGroupService: ScheduleGroupService
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.fetchInstructors();
    this.findCurrentCourse();
    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.scheduleGroupService.scheduleGroupsSubject$
      .pipe(untilDestroyed(this))
      .subscribe((scheduleGroups) => (this.scheduleGroups = scheduleGroups));
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

  override onSubmit(): void {
    if (this.formSettings.formType === FormType.SCHEDULE_GROUP) {
      this.updateScheduleGroup();
      this.add();
    }
  }

  private updateScheduleGroup() {
    (this.entity as ScheduleGroup).course = this.course;
  }
  override update(): void {
    throw new Error('Method not implemented.');
  }
  override add(): void {
    if (this.formSettings.formType === FormType.SCHEDULE_GROUP) {
      this.scheduleGroupService.addScheduleGroup(this.entity);
    }
  }

  addScheduleGroup(content: any) {
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.formSettings.edit = false;
    this.formSettings.titile =
      'Dodaj nową grupę dla kategorii: ' + this.course.categoryType;
    this.entity = {};
    super.onAdd(content);
  }

  addSchedule(content: any, date: any) {
    this.entity = {
      startDate: date,
    };
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = false;
    this.formSettings.titile =
      'Dodaj nowy termin kategorii: ' + this.course.categoryType;
    super.onAdd(content);
  }

  editSchedule(content: any, schedule: Schedule) {
    this.entity = schedule;
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = true;
    this.formSettings.titile =
      'Edytuj termin kategorii: ' + this.course.categoryType;
    super.onEdit(content, schedule);
  }
}
