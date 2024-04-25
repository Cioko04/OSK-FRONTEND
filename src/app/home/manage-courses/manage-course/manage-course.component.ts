import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { ToastService } from 'src/app/shared/common/toast/toast.service';
import {
  BaseEntityComponent,
  HeadArray,
} from 'src/app/shared/core/BaseEntityComponent';
import { Course } from 'src/app/shared/services/course/course';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import {
  CourseType,
  ScheduleGroup,
} from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { AddContent } from 'src/app/shared/utils/table/table-interfaces/add-content';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';
import { ManageCourseService } from './manage-course.service';

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
    private manageCourseService: ManageCourseService,
    private scheduleGroupService: ScheduleGroupService,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => this.manageCourseService.init(+params['id']));
    this.subscribeCurrenCourse();
    this.susbscribeScheduleGroups();
    this.susbscribeTableScheduleGroups();
  }

  private susbscribeTableScheduleGroups() {
    this.manageCourseService.tableScheduleGroups$
      .pipe(untilDestroyed(this))
      .subscribe(
        (tableScheduleGroups) =>
          (this.tableScheduleGroups = tableScheduleGroups)
      );
  }

  private susbscribeScheduleGroups() {
    this.manageCourseService.scheduleGroups$
      .pipe(untilDestroyed(this))
      .subscribe((scheduleGroups) => (this.scheduleGroups = scheduleGroups));
  }

  private subscribeCurrenCourse() {
    this.manageCourseService.currentCourse$
      .pipe(untilDestroyed(this))
      .subscribe((course) => (this.course = course));
  }

  override onFormSubmit(): void {
    this.formSettings.edit ? this.onUpdateEntity() : this.onAddEntity();
  }

  override onAddEntity(): void {
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

  override onUpdateEntity(): void {
    switch (this.formSettings.formType) {
      case FormType.SCHEDULE:
        this.scheduleService.updateSchedule(this.entity as Schedule);
        break;
      case FormType.SCHEDULE_GROUP:
        this.scheduleGroupService.updateGroup(this.entity as ScheduleGroup);
        break;
    }
  }

  override onDeleteEntity(id: number, formType: FormType): void {
    switch (formType) {
      case FormType.SCHEDULE:
        this.scheduleService.removeSchedule(id);
        break;
      default:
        this.scheduleGroupService.removeScheduleGroup(id);
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

  openAddForm(content: any, addContent: AddContent) {
    this.formSettings.buttonText = 'Dodaj';
    this.formSettings.edit = false;
    switch (addContent?.formType) {
      case FormType.SCHEDULE:
        this.openAddScheduleForm(content, new Date(), addContent.sourceId);
        break;
      case FormType.SIGNUP:
        this.openAddStudentForm(content);
        break;
      default:
        this.openAddScheduleGroupForm(content);
    }
  }

  override onOpenEditForm(content: any, entity: Schedule | ScheduleGroup) {
    this.formSettings.edit = true;
    this.formSettings.titile =
      'Edytuj grupę dla kategorii: ' + this.course.categoryType;
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.entity = this.scheduleGroups.find((group) => group.id === entity.id)!;
    super.onOpenEditForm(content, this.entity);
  }

  private openAddStudentForm(content: any) {
    this.formSettings.formType = FormType.SIGNUP;
    this.formSettings.titile = 'Dodaj nowego studenta';
    this.entity = {};
    super.onOpenAddForm(content);
  }

  private openAddScheduleGroupForm(content: any) {
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.formSettings.titile =
      'Dodaj nową grupę dla kategorii: ' + this.course.categoryType;
    this.entity = {};
    super.onOpenAddForm(content);
  }

  openAddScheduleForm(content: any, date: any, sourceId?: number) {
    this.entity = {
      scheduleGroup: this.scheduleGroups.find((group) => group.id === sourceId),
      startDate: date,
    };
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = false;
    this.formSettings.titile =
      'Dodaj nowy termin kategorii: ' + this.course.categoryType;
    super.onOpenAddForm(content);
  }

  openEditScheduleForm(content: any, schedule: Schedule) {
    this.entity = schedule;
    this.formSettings.formType = FormType.SCHEDULE;
    this.formSettings.edit = true;
    this.formSettings.titile =
      'Edytuj termin kategorii: ' + this.course.categoryType;
    this.formSettings.buttonText = 'Zapisz';
    super.onOpenEditForm(content, schedule);
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
