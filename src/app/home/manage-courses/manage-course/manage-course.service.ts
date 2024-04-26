import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Course } from 'src/app/shared/services/course/course';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { ScheduleGroup } from 'src/app/shared/services/scheduleGroup/schedule-group';
import { ScheduleGroupService } from 'src/app/shared/services/scheduleGroup/schedule-group.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TableScheduleGroup } from './manage-course.component';
import { TableScheduleGroupService } from './table-schedule-group/table-schedule-group.service';
import { User } from 'src/app/shared/services/user/user';
import { ToastService } from 'src/app/shared/common/toast/toast.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ManageCourseService {
  private currentCourse = new BehaviorSubject<Course>({} as Course);
  currentCourse$ = this.currentCourse.asObservable();

  private tableScheduleGroups = new BehaviorSubject<TableScheduleGroup[]>([]);
  tableScheduleGroups$ = this.tableScheduleGroups.asObservable();

  private scheduleGroups = new BehaviorSubject<ScheduleGroup[]>([]);
  scheduleGroups$ = this.scheduleGroups.asObservable();

  constructor(
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService,
    private scheduleGroupService: ScheduleGroupService,
    private scheduleService: ScheduleService,
    private tableScheduleGroupService: TableScheduleGroupService,
    private toastService: ToastService
  ) {}

  public init(courseId: number) {
    this.fetchInstructors();
    this.setCurrentCourse(courseId);
    this.fetchScheduleGroups();
  }

  public registerUser(student: User) {
    this.authenticationService
      .register(student)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: (e: HttpErrorResponse) => {
          console.log(e.status);
          this.toastService.openFailToast('Nie udało się dodać studenta!');
        },
        complete: () => {
          this.scheduleGroupService.addStudentToGroup(student, student.scheduleGroups![0]);
          this.toastService.openSuccesToast('Pomyślnie dodano studenta!');
        },
      });
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

  private setCurrentCourse(courseId: number): void {
    this.currentCourse.next(this.courseService.getCourseById(courseId));
  }

  private fetchScheduleGroups() {
    if (this.currentCourse.getValue()) {
      const course = this.currentCourse.getValue();
      this.scheduleGroupService.fetchScheduleGroupForCourse(course.id!);
      this.scheduleService.getScheduleForCourse(course.id!);
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
          this.tableScheduleGroups.next(updatedTableScheduleGroups);
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
    this.scheduleGroups.next(groups);
  }
}
