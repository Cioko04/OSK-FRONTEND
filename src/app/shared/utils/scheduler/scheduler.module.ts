import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SchedulePlaceholderComponent } from './schedule-placeholder/schedule-placeholder.component';
import { SchedulerNavComponent } from './scheduler-nav/scheduler-nav.component';
import { SchedulerTableComponent } from './scheduler-table/scheduler-table.component';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  imports: [
    MatDividerModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    SchedulerComponent,
    SchedulerTableComponent,
    SchedulerNavComponent,
    SchedulePlaceholderComponent,
  ],
  exports: [SchedulerComponent],
})
export class SchedulerModule {}
