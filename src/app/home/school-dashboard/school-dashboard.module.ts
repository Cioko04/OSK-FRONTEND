import { NgModule } from '@angular/core';
import { FormModule } from 'src/app/forms/form.module';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { SchoolDashboardRoutingModule } from './school-dashboard.module.routing';
import { ManageCoursesModule } from './manage-courses/manage-courses.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    FormModule,
    TableModule,
    SchoolDashboardRoutingModule,
    ManageCoursesModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  declarations: [InstructorListComponent],
})
export class SchoolDashboardModule {}
