import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { error } from 'console';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import {
  BaseEntityComponent,
  HeadArray,
} from 'src/app/shared/core/BaseEntityComponent';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import {
  CourseType,
  ScheduleGroup,
} from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';

interface TableScheduleGroup {
  id?: number;
  instructor: string;
  startDate?: Date;
  endDate?: Date;
  type: CourseType;
  status?: ScheduleStatus;
  expansionPanelDetails?: ExpansionPanelDetail[];
}

enum ScheduleStatus {
  WAITING = 'Oczekujący',
  ONGOING = 'Rozpoczęty',
  FINISHED = 'Zakończony',
}

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
    { Head: 'Data rozpoczęcia', FieldName: 'startDate' },
    { Head: 'Data zakończenia', FieldName: 'endDate' },
    { Head: 'Typ', FieldName: 'type' },
    { Head: 'Status', FieldName: 'status' },
  ];

  formSettings: FormSettings = {
    formType: FormType.SCHEDULE,
    buttonText: 'Zapisz',
    edit: false,
    titile: '',
  };

  signInFormSettings: SignInFormSettings = {
    school: false,
    instructor: false,
    user: true,
  };

  entity!: Schedule | ScheduleGroup;
  scheduleGroups: ScheduleGroup[] = [];
  tableScheduleGroups: TableScheduleGroup[] = [];

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
    this.fetchScheduleGroups();
  }

  private fetchScheduleGroups() {
    if (this.course) {
      this.scheduleGroupService.fetchScheduleGroupForCourse(this.course.id!);
      this.scheduleGroupService.scheduleGroupsSubject$
        .pipe(untilDestroyed(this))
        .subscribe((groups) => {
          this.scheduleGroups = groups;
          this.tableScheduleGroups = groups.map((group) =>
            this.createTableScheduleGroups(group)
          );
        });
    }
  }

  private createTableScheduleGroups(group: ScheduleGroup): TableScheduleGroup {
    return {
      id: group.id,
      instructor: this.instructorService.getInstructorName(
        group.instructor?.userRequest
      ),
      // TODO: implement it when finish schedule
      // startDate: ,
      // endDate: Date,
      type: group.type!,
      // status: ,
      expansionPanelDetails: this.createExpansionPanelDetails(group),
    };
  }

  private createExpansionPanelDetails(
    group: ScheduleGroup
  ): ExpansionPanelDetail[] {
    const students = {
      icon: 'account_circle',
      titile: 'Studenci',
      description: 'Liczba studentów: ',
      buttonText: 'Dodaj studenta',
      formType: FormType.SIGNUP,
      entities: [
        { id: 1, displayContent: 'Kazik Kowalski' },
        { id: 2, displayContent: 'Andrzej Okoń' },
      ],
    };

    const schedules = {
      icon: 'date_range',
      titile: 'Spotkania',
      description: 'Liczba spotkań: ',
      buttonText: 'Dodaj spotkanie',
      formType: FormType.SCHEDULE,
      entities: [
        { id: 1, displayContent: '2024-04-01, 11:00 - 12:30' },
        { id: 2, displayContent: '2024-04-06, 9:30 - 11:30' },
      ],
    };

    return [students, schedules];
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
    console.log(id);
    // this.scheduleGroupService.removeScheduleGroup(id);
  }

  override onSubmit(): void {
    this.formSettings.edit ? this.update() : this.add();
  }

  override update(): void {
    switch (this.formSettings.formType) {
      case FormType.SCHEDULE:
        //TODO: update schedule
        break;
      case FormType.SCHEDULE_GROUP:
        this.scheduleGroupService.updateGroup(this.entity as ScheduleGroup);
        break;
    }
  }

  override onEdit(content: any, entity: Schedule | ScheduleGroup) {
    this.formSettings.edit = true;
    this.formSettings.titile =
      'Edytuj grupę dla kategorii: ' + this.course.categoryType;
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.entity = this.scheduleGroups.find(
      (group) => group.id === (entity as ScheduleGroup).id
    )!;
    super.onEdit(content, this.entity);
  }

  override add(): void {
    switch (this.formSettings.formType) {
      case FormType.SCHEDULE:
        //TODO: add schedule
        break;
      case FormType.SCHEDULE_GROUP:
        (this.entity as ScheduleGroup).course = this.course;
        this.scheduleGroupService.addScheduleGroup(this.entity);
        break;
    }
  }

  addEntity(content: any, formType: FormType) {
    this.formSettings.buttonText = 'Dodaj';
    this.formSettings.edit = false;
    switch (formType) {
      case FormType.SCHEDULE:
        this.addSchedule(content, new Date());
        break;
      case FormType.SIGNUP:
        this.addStudent(content);
        break;
      default:
        this.addScheduleGroup(content);
    }
  }

  private addStudent(content: any) {
    this.formSettings.formType = FormType.SIGNUP;
    this.formSettings.titile = 'Dodaj nowego studenta';
    this.entity = {};
    super.onAdd(content);
  }

  private addScheduleGroup(content: any) {
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
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
