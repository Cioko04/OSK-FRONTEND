import { Component, OnDestroy, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { SchedulerService } from '../scheduler.service';

@Component({
  selector: 'app-scheduler-nav',
  templateUrl: './scheduler-nav.component.html',
  styleUrls: ['./scheduler-nav.component.css', '../../utils-style.css'],
})
export class SchedulerNavComponent implements OnInit, OnDestroy {
  currentDate!: Date;

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
