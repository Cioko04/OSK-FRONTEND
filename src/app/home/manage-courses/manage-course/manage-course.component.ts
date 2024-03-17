import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';
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
import {
  CourseType,
  ScheduleGroup,
} from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { UserService } from 'src/app/shared/services/user/user.service';

interface TableScheduleGroup {
  id?: number;
  instructor: string;
  startDate?: Date;
  endDate?: Date;
  type: CourseType;
  status?: ScheduleStatus;
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

  entity!: Schedule | ScheduleGroup;
  scheduleGroups$!: Observable<TableScheduleGroup[]>;
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
    this.findRelevantScheduleGroups();
  }

  private findRelevantScheduleGroups() {
    // this.scheduleGroups$ =
    // {
    //   return groups
    //     .filter((group) => group.course?.id === this.course.id)
    //     .map((group) => this.createTableScheduleGroups(group));
    // }
    this.scheduleGroupService.scheduleGroupsSubject$
      .pipe(
        map((groups) =>
          groups.filter((group) => group.course?.id === this.course.id)
        ),
        untilDestroyed(this)
      )
      .subscribe((groups) => {
        this.scheduleGroups = groups;
        this.tableScheduleGroups = groups.map((group) =>
          this.createTableScheduleGroups(group)
        );
      });
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
    };
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
    this.scheduleGroupService.removeScheduleGroup(id);
  }

  override onSubmit(): void {
    if (this.formSettings.formType === FormType.SCHEDULE_GROUP) {
      if (this.formSettings.edit) {
        this.update()
      } else {
        this.addCourseToScheduleGroup();
        this.add();
      }
    }
  }

  private addCourseToScheduleGroup() {
    (this.entity as ScheduleGroup).course = this.course;
  }

  override update(): void {
    this.scheduleGroupService.updateGroup(this.entity as ScheduleGroup);
  }

  override onEdit(content: any, entity: Schedule | ScheduleGroup) {
    this.formSettings.edit = true;
    this.formSettings.titile = 'Edytuj grupę dla kategorii: ' + this.course.categoryType;
    this.formSettings.formType = FormType.SCHEDULE_GROUP;
    this.entity = this.scheduleGroups.find((group) => group.id === (entity as ScheduleGroup).id)!;
    super.onEdit(content, this.entity);
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
