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
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        // canActivate: [HasRoleGuard],
        // data: {
        //   role: 'ADMIN',
        // }
      },
    ],
  },
  { path: 'welcome', component: WelcomeComponent },
  {path: '', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
