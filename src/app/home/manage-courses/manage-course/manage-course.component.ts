import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, map } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { ToastService } from 'src/app/shared/common/toast/toast.service';
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
import { User } from 'src/app/shared/services/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AddContent } from 'src/app/shared/utils/table/table-interfaces/add-content';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';
import { TableScheduleGroupService } from './table-schedule-group/table-schedule-group.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  entity!: Schedule | ScheduleGroup | User;
  scheduleGroups: ScheduleGroup[] = [];
  tableScheduleGroups: TableScheduleGroup[] = [];

  private course!: Course;

  constructor(
    modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private courseServive: CourseService,
    private scheduleGroupService: ScheduleGroupService,
    private scheduleService: ScheduleService,
    private tableScheduleGroupService: TableScheduleGroupService,
    private toastService: ToastService
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
      this.scheduleService.getScheduleForCourse(this.course.id!);
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
    let email = this.authenticationService.getSessionUserEmail();
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
        this.scheduleService.updateSchedule(this.entity as Schedule);
        break;
      case FormType.SCHEDULE_GROUP:
        this.scheduleGroupService.updateGroup(this.entity as ScheduleGroup);
        break;
    }
  }

  override onEdit(content: any, entity: Schedule | ScheduleGroup) {
    this.setFormSettingsEditAndButton(true, 'Zapisz');
    this.setFormSettingsTextAndType(
      'Edytuj grupę dla kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE_GROUP
    );
    this.entity = this.scheduleGroups.find((group) => group.id === entity.id)!;
    super.onEdit(content, this.entity);
  }

  override add(): void {
    switch (this.formSettings.formType) {
      case FormType.SCHEDULE:
        this.scheduleService.addScheduleForGroup(this.entity as Schedule);
        break;
      case FormType.SIGNUP:
        this.registerUserAndAddToGroup();
        break;
      case FormType.SCHEDULE_GROUP:
        (this.entity as ScheduleGroup).course = this.course;
        this.scheduleGroupService.addScheduleGroup(
          this.entity as ScheduleGroup
        );
        break;
    }
  }
  private registerUserAndAddToGroup() {
    this.authenticationService
      .register(this.entity as User)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: (e: HttpErrorResponse) => {
          console.log(e.status);
        },
        complete: () => {
          this.scheduleGroupService.addStudentToGroup(this.entity);
          this.toastService.openSuccesToast('Pomyślnie dodano studenta!');
        },
      });
    
  }

  addEntity(content: any, addContent: AddContent) {    
    this.setFormSettingsEditAndButton(false, 'Dodaj');
    switch (addContent?.formType) {
      case FormType.SCHEDULE:
        this.addSchedule(content, new Date(), addContent.sourceId);
        break;
      case FormType.SIGNUP:
        this.addStudent(content, addContent.sourceId);
        break;
      default:
        this.addScheduleGroup(content);
    }
  }

  private addStudent(content: any, sourceId?: number) {
    this.entity = {
      scheduleGroups: this.scheduleGroups.filter(
        (group) => group.id === sourceId
      ),
    };
    this.setFormSettingsTextAndType('Dodaj nowego studenta', FormType.SIGNUP);
    super.onAdd(content);
  }

  private addScheduleGroup(content: any) {
    this.entity = {};
    this.setFormSettingsTextAndType(
      'Dodaj nową grupę dla kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE_GROUP
    );
    super.onAdd(content);
  }

  addSchedule(content: any, date: any, sourceId?: number) {
    this.entity = {
      scheduleGroup: this.scheduleGroups.find((group) => group.id === sourceId),
      startDate: date,
    };
    this.setFormSettingsTextAndType(
      'Dodaj nowy termin kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE
    );
    super.onAdd(content);
  }

  editSchedule(content: any, schedule: Schedule) {
    this.entity = schedule;
    this.setFormSettingsTextAndType(
      'Edytuj termin kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE
    );
    this.setFormSettingsEditAndButton(true, 'Zapisz');
    super.onEdit(content, schedule);
  }

  private setFormSettingsTextAndType(
    displayedText: string,
    formType: FormType
  ) {
    this.formSettings.formType = formType;
    this.formSettings.titile = displayedText;
  }

  private setFormSettingsEditAndButton(isEdit: boolean, buttonText: string) {
    this.formSettings.edit = isEdit;
    this.formSettings.buttonText = buttonText;
  }
}
