import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { List } from '../../core/list';
import { Schedule } from '../../services/schedule/schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  schedule!: Schedule;
  edit: boolean = false;
  private dataSubscription: Subscription = new Subscription();

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.dataSubscription.add(
      this.scheduleService.scheduleSubject$.subscribe((schedules) => {
        if (this.schedules !== schedules) {
          this.schedules = schedules;
        }
      })
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  editSchedule(schedule: Schedule) {
    this.onEdit.emit(schedule);
  }

  addSchedule(date: Date) {
    this.onAdd.emit(date);
  }
}
