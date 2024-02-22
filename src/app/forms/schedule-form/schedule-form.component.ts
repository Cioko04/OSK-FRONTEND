import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  selectedTime: {hour: number, minute: number} = {hour: 12, minute: 0};

  constructor() { }

  ngOnInit() {
  }

}
