import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/services/schedule/schedule';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
})
export class ScheduleFormComponent implements OnInit {
  @Input()
  schedule!: Schedule;

  constructor() {}

  ngOnInit() {
    this.setEndDate();
  }

  setEndDate() {
    if (!this.schedule.endDate) {
      let date = new Date(this.schedule.startDate!);
      date.setHours(date.getHours() + 1);
      this.schedule.endDate = date;
    } 
  }
}
