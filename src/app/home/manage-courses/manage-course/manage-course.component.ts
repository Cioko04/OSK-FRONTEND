import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import {
  CourseType,
  ScheduleGroup,
} from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';
import { TableScheduleGroupService } from './table-schedule-group/table-schedule-group.service';
import { combineLatest, filter, map } from 'rxjs';

export interface TableScheduleGroup {
  id?: number;
  instructor: string;
  startDate?: string;
  endDate?: string;
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
    private scheduleGroupService: ScheduleGroupService,
    private scheduleService: ScheduleService,
    private tableScheduleGroupService: TableScheduleGroupService
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
      combineLatest([
        this.scheduleGroupService.scheduleGroupsSubject$,
        this.scheduleService.scheduleSubject$,
      ])
        .pipe(
          untilDestroyed(this),
          map(([groups, schedules]) =>
            this.createTableScheduleGroups(groups, schedules)
          )
        )
        .subscribe((updatedTableScheduleGroups) => {
          this.tableScheduleGroups = updatedTableScheduleGroups;
        });
    }
  }

  private createTableScheduleGroups(
    groups: ScheduleGroup[],
    schedules: Schedule[]
  ): TableScheduleGroup[] {
    this.addSchedulesToGroups(groups, schedules);
    return groups.map((group) =>
      this.tableScheduleGroupService.createTableScheduleGroups(group)
    );
  }

  private addSchedulesToGroups(groups: ScheduleGroup[], schedules: Schedule[]) {
    groups.forEach((group) => {
      const schedulesForGroup = schedules.filter(
        (schedule) => schedule.scheduleGroup?.id === group.id
      );
      group.schedules = schedulesForGroup;
    });
    this.scheduleGroups = groups;
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

  override onDelete(id: number, formType: FormType): void {
    switch (formType) {
      case FormType.SCHEDULE:
        this.scheduleService.removeSchedule(id);
        break;
      default:
        this.scheduleGroupService.removeScheduleGroup(id);
        break;
    }
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
    this.entity = this.scheduleGroups.find(group => group.id === entity.id)!;
    super.onEdit(content, this.entity);
  }

  override add(): void {
    switch (this.formSettings.formType) {
      case FormType.SCHEDULE:
        this.scheduleService.addScheduleForGroup(this.entity);
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
    this.formSettings.buttonText = 'Zapisz';
    super.onEdit(content, schedule);
  }
}
