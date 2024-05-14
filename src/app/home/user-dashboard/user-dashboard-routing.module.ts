import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCategoryComponent } from './course-sign-up/choose-category/choose-category.component';
import { CourseSignUpMenuComponent } from './course-sign-up/course-sign-up-menu/course-sign-up-menu.component';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { PaymentsComponent } from './payments/payments.component';

const userDashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./course-sign-up/course-sign-up.module').then(
        (m) => m.CourseSignUpModule
      ),
  },
  {
    path: 'my-courses',
    component: MyCoursesComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userDashboardRoutes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
