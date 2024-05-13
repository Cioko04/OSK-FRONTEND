import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/forms/form.module';
import { SchedulerModule } from 'src/app/shared/utils/scheduler/scheduler.module';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ManageCoursesComponent } from './manage-courses.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    FormModule,
    TableModule,
    RouterModule,
    SchedulerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  declarations: [
    ManageCoursesComponent,
    ManageCourseComponent,
    InfoCardComponent,
    AllCoursesComponent,
  ],
  exports: [ManageCourseComponent, ManageCoursesComponent, AllCoursesComponent]
})
export class ManageCoursesModule {}
