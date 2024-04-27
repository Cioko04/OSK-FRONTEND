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
import { User } from 'src/app/shared/services/user/user';
import { AddContent } from 'src/app/shared/utils/table/table-interfaces/add-content';
import { ExpansionPanelDetail } from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';
import { ManageCourseService } from './manage-course.service';
import { DeleteContent } from 'src/app/shared/utils/table/table-interfaces/delete-content';

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
    private route: ActivatedRoute,
    private toastService: ToastService
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
        this.scheduleService.addScheduleForGroup(this.entity as Schedule);
        break;
      case FormType.SIGNUP:
        this.manageCourseService.registerUser(this.entity as User);
        break;
      case FormType.SCHEDULE_GROUP:
        (this.entity as ScheduleGroup).course = this.course;
        this.scheduleGroupService.addScheduleGroup(
          this.entity as ScheduleGroup
        );
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

  override onDeleteEntity(deleteContent: DeleteContent): void {
    try {
      switch (deleteContent.formType) {
        case FormType.SCHEDULE:
          this.scheduleService.removeSchedule(deleteContent.id);
          break;
        case FormType.SIGNUP:
          this.scheduleGroupService.removeStudentFromGroup(deleteContent.id, deleteContent.sourceId!);
          break;
        default:
          this.scheduleGroupService.removeScheduleGroup(deleteContent.id);
          break;
      }
      this.toastService.openSuccessToast(`Pomyślnie usunięto ${this.adjustGrammar(deleteContent.formType, true)}!`)
    } catch(error) {
      console.log(error);
      this.toastService.openFailToast(`Błąd podczas usuwania ${this.adjustGrammar(deleteContent.formType, false)}!`)
    }
    
  }

  private adjustGrammar(formType: FormType | undefined, success: boolean) {
    switch (formType) {
      case FormType.SCHEDULE:
        return success ? 'termin' : 'terminu';
      case FormType.SIGNUP:
        return 'studenta';
      default:
        return success ? 'grupę' : 'grupy';
    }
  }

  override onOpenAddForm(content: any, addContent?: AddContent) {
    this.setFormEditAndButton(false, 'Dodaj');
    switch (addContent?.formType) {
      case FormType.SCHEDULE:
        this.openAddScheduleForm(content, new Date(), addContent.sourceId);
        break;
      case FormType.SIGNUP:
        this.openAddStudentForm(content, addContent.sourceId);
        break;
      default:
        this.openAddScheduleGroupForm(content);
    }
  }

  override onOpenEditForm(content: any, entity: Schedule | ScheduleGroup) {
    this.setFormEditAndButton(true, 'Zapisz');
    this.setFormTextAndType('Edytuj grupę dla kategorii: ' + this.course.categoryType, FormType.SCHEDULE_GROUP);
    this.entity = this.scheduleGroups.find((group) => group.id === entity.id)!;
    super.onOpenEditForm(content, this.entity);
  }

  private openAddStudentForm(content: any, sourceId: number) {
    this.entity = {
      scheduleGroups: [
        this.scheduleGroupService.getScheduleGroupById(sourceId)!,
      ],
    };
    this.setFormTextAndType('Dodaj nowego studenta', FormType.SIGNUP);
    super.onOpenAddForm(content);
  }

  private openAddScheduleGroupForm(content: any) {
    this.entity = {};
    this.setFormTextAndType(
      'Dodaj nową grupę dla kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE_GROUP
    );
    super.onOpenAddForm(content);
  }

  openAddScheduleForm(content: any, date: any, sourceId?: number) {
    if (this.scheduleGroups.length > 0) {
      this.setFormEditAndButton(false, 'Dodaj');
      this.entity = {
        scheduleGroup: this.scheduleGroupService.getScheduleGroupById(
          sourceId!
        ),
        startDate: date,
      };
      this.setFormTextAndType(
        'Dodaj nowy termin kategorii: ' + this.course.categoryType,
        FormType.SCHEDULE
      );
      super.onOpenAddForm(content);
    } else {
      this.toastService.openWarningToast(
        'Aby dodać termin trzeba najpierw utworzyć grupę!'
      );
    }
  }

  openEditScheduleForm(content: any, schedule: Schedule) {
    this.entity = schedule;
    this.setFormTextAndType(
      'Edytuj termin kategorii: ' + this.course.categoryType,
      FormType.SCHEDULE
    );
    this.setFormEditAndButton(true, 'Zapisz');
    super.onOpenEditForm(content, schedule);
  }

  private setFormTextAndType(displayedText: string, formType: FormType) {
    this.formSettings.formType = formType;
    this.formSettings.titile = displayedText;
  }

  private setFormEditAndButton(isEdit: boolean, buttonText: string) {
    this.formSettings.edit = isEdit;
    this.formSettings.buttonText = buttonText;
  }
}
