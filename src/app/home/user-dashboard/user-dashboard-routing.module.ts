import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { PaymentsComponent } from './payments/payments.component';

const userDashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then(
        (m) => m.SignUpModule
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
