import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

@Component({
  selector: 'app-schedule-group-form',
  templateUrl: './schedule-group-form.component.html',
  styleUrls: ['./schedule-group-form.component.css'],
})
export class ScheduleGroupFormComponent extends BaseFormComponent {
  constructor() {
    super();
  }

  ngOnInit() {}

  override submit(): void {
    throw new Error('Method not implemented.');
  }
}
