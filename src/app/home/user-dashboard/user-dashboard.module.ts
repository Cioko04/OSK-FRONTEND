import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormModule } from 'src/app/forms/form.module';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';

@NgModule({
  imports: [
    FormModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    TableModule,
    UserDashboardRoutingModule,
    SignUpModule
  ],
  declarations: [PaymentsComponent, MyCoursesComponent, CoursesComponent],
})
export class UserDashboardModule {}
