import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { Schedule } from '../../services/schedule/schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { SchedulerService } from './scheduler.service';

@UntilDestroy()
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  schedules: Schedule[] = [];
  schedule!: Schedule;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  constructor(
    private scheduleService: ScheduleService,
    private schedulerService: SchedulerService
  ) {}

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    combineLatest([
      this.scheduleService.scheduleSubject$.pipe(untilDestroyed(this)),
      this.schedulerService.week$.pipe(untilDestroyed(this)),
    ]).subscribe(([schedules, week]) => {
      this.schedules = this.getSchedulesInWeek(schedules, week);
    });
  }

  editSchedule(schedule: Schedule) {
    this.onEdit.emit(schedule);
  }

  addSchedule(date: Date) {
    this.onAdd.emit(date);
  }

  private getSchedulesInWeek(
    schedules: Schedule[],
    weekDays: Date[]
  ): Schedule[] {
    return schedules.filter((schedule) =>
      this.scheduleService.isDateBetween(
        schedule.startDate!,
        weekDays[0],
        weekDays[weekDays.length - 1]
      )
    );
  }
}
