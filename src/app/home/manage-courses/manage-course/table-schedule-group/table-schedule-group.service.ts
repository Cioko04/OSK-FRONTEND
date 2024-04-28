import { Injectable } from '@angular/core';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { ScheduleGroup } from 'src/app/shared/services/scheduleGroup/schedule-group';
import {
  ExpansionPanelDetail,
  ExpansionPanelEntity,
} from 'src/app/shared/utils/table/table-list/expansion-panel/expansion-panel.component';
import { User } from '../../../../shared/services/user/user';
import { TableScheduleGroup } from '../manage-course.component';

@Injectable({
  providedIn: 'root',
})
export class TableScheduleGroupService {
  constructor(private instructorService: InstructorService) {}

  public createTableScheduleGroups(group: ScheduleGroup): TableScheduleGroup {
    return {
      id: group.id,
      instructor: this.instructorService.getInstructorName(
        group.instructor?.userRequest!
      ),
      startDate: this.findDateOfFirstSchedule(group.schedules),
      // endDate: Date,
      type: group.type!,
      // status: ,
      expansionPanelDetails: this.createExpansionPanelDetails(group),
    };
  }

  private findDateOfFirstSchedule(schedules: Schedule[] | undefined): string {
    if (schedules && schedules.length > 0) {
      return schedules
        .reduce((earliest, current) => {
          return current.startDate! < earliest.startDate! ? current : earliest;
        })
        .startDate!.toLocaleDateString();
    }
    return '';
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
      entities: group.students
        ? this.getStudentInformationToDisplay(group.students)
        : [],
      // [
      //   { id: 1, displayContent: 'Kazik Kowalski' },
      //   { id: 2, displayContent: 'Andrzej Okoń' },
      // ],
    };

    const schedules = {
      icon: 'date_range',
      titile: 'Spotkania',
      description: 'Liczba spotkań: ',
      buttonText: 'Dodaj spotkanie',
      formType: FormType.SCHEDULE,
      entities: group.schedules
        ? this.getSchedulesForDisplay(group.schedules)
        : [],
    };

    return [students, schedules];
  }

  private getStudentInformationToDisplay(
    students: User[]
  ): ExpansionPanelEntity[] {
    return students
      .sort((a, b) => this.sortByLastNameAndName(a, b))
      .map((student) => this.mapStudentInformationToDisplay(student));
  }

  private mapStudentInformationToDisplay(student: User): ExpansionPanelEntity {
    return {
      id: student.id!,
      displayContent: student.name + ' ' + student.lastName,
      update: false
    };
  }

  private sortByLastNameAndName(a: User, b: User): number {
    return a.lastName !== b.lastName
      ? a.lastName!.localeCompare(b.lastName!)
      : a.name!.localeCompare(b.name!);
  }

  private getSchedulesForDisplay(
    schedules: Schedule[]
  ): ExpansionPanelEntity[] {
    return schedules
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())
      .map((schedule) => this.mapScheduleForDisplay(schedule));
  }

  private mapScheduleForDisplay(schedule: Schedule): ExpansionPanelEntity {
    return {
      id: schedule.id!,
      displayContent: this.getScheduleDisplayInformation(schedule),
      update: true
    };
  }

  private getScheduleDisplayInformation(schedule: Schedule): string {
    const startDate = schedule.startDate
      ? `${schedule.startDate.toLocaleDateString()}, ${schedule.startDate
          .getHours()
          .toString()
          .padStart(2, '0')}:${schedule.startDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      : '';
    const endDate = schedule.endDate
      ? `${schedule.endDate
          .getHours()
          .toString()
          .padStart(2, '0')}:${schedule.endDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      : '';
    return startDate + ' - ' + endDate;
  }
}
