import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { CoursesComponent } from './home/courses/courses.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { MyCoursesComponent } from './home/courses/my-courses/my-courses.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'courses',
            component: CoursesComponent,
          },
          {
            path: 'my-courses',
            component: MyCoursesComponent
          },
          {
            path: 'payments',
            component: PaymentsComponent,
          }
        ],
      },
      { path: 'welcome', component: WelcomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
