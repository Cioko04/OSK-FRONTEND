import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HasRoleGuard } from './authentication/has-role.guard';
import { CoursesComponent } from './home/user-dashboard/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { InstructorListComponent } from './home/school-dashboard/instructor-list/instructor-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SchoolListComponent } from './home/admin-dashboard/school-list/school-list.component';
import { AllCoursesComponent } from './home/school-dashboard/manage-courses/all-courses/all-courses.component';
import { ManageCourseComponent } from './home/school-dashboard/manage-courses/manage-course/manage-course.component';
import { ManageCoursesComponent } from './home/school-dashboard/manage-courses/manage-courses.component';
import { MyCoursesComponent } from './home/user-dashboard/my-courses/my-courses.component';
import { PaymentsComponent } from './home/user-dashboard/payments/payments.component';
import { CourseSignUpComponent } from './home/user-dashboard/course-sign-up/course-sign-up.component';
import { ChooseSchoolComponent } from './home/user-dashboard/course-sign-up/choose-school/choose-school.component';
import { CourseSignUpMenuComponent } from './home/user-dashboard/course-sign-up/course-sign-up-menu/course-sign-up-menu.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'course-sign-up',
        component: CourseSignUpComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'USER',
        },
        children: [
          {
            path: '',
            component: CourseSignUpMenuComponent,
          },
          {
            path: 'choose-school',
            component: ChooseSchoolComponent,
          }
        ],
      },
      {
        path: 'choose-school',
        component: ChooseSchoolComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'USER',
        },
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'USER',
        },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'USER',
        },
      },
      {
        path: 'schools',
        component: SchoolListComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'ADMIN',
        },
      },
      {
        path: 'instructors',
        component: InstructorListComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'OSK_ADMIN',
        },
      },
      {
        path: 'manage-courses',
        component: ManageCoursesComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: 'OSK_ADMIN',
        },
        children: [
          {
            path: '',
            component: AllCoursesComponent,
          },
          {
            path: ':id',
            component: ManageCourseComponent,
          },
        ],
      },
    ],
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
