import { Component, OnDestroy, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { SchedulerService } from '../scheduler.service';
import { Subscription } from 'rxjs';

interface WeekSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-scheduler-nav',
  templateUrl: './scheduler-nav.component.html',
  styleUrls: ['./scheduler-nav.component.css'],
})
export class SchedulerNavComponent implements OnInit, OnDestroy {
  currentDate!: Date;
  viewSelect: WeekSelect[] = [
    { value: 'day', viewValue: 'Dzień' },
    { value: 'week', viewValue: 'Dni robocze' },
    { value: 'weekedn', viewValue: 'Weekend' },
  ];

  private dataSubscription: Subscription = new Subscription();

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.dataSubscription.add(
      this.schedulerService.currentDate$.subscribe((currentDate) => {
        this.currentDate = currentDate;
      })
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  moveLeft() {
    this.schedulerService.moveLeft();
  }

  moveRight() {
    this.schedulerService.moveRight();
  }

  reset() {
    this.schedulerService.reset();
  }

  onDateChange(date: Moment) {
    this.schedulerService.onDateChange(date);
  }
}
