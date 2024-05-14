import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthenticationGuard],
  //   children: [
  //     {
  //       path: 'course-sign-up',
  //       component: CourseSignUpComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'USER',
  //       },
  //       children: [
  //         {
  //           path: '',
  //           component: CourseSignUpMenuComponent,
  //         },
  //         {
  //           path: 'choose-school',
  //           component: ChooseSchoolComponent,
  //         }
  //       ],
  //     },
  //     {
  //       path: 'choose-school',
  //       component: ChooseSchoolComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'USER',
  //       },
  //     },
  //     {
  //       path: 'my-courses',
  //       component: MyCoursesComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'USER',
  //       },
  //     },
  //     {
  //       path: 'payments',
  //       component: PaymentsComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'USER',
  //       },
  //     },
  //     {
  //       path: 'schools',
  //       component: SchoolListComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'ADMIN',
  //       },
  //     },
  //     {
  //       path: 'instructors',
  //       component: InstructorListComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'OSK_ADMIN',
  //       },
  //     },
  //     {
  //       path: 'manage-courses',
  //       component: ManageCoursesComponent,
  //       canActivate: [HasRoleGuard],
  //       data: {
  //         role: 'OSK_ADMIN',
  //       },
  //       children: [
  //         {
  //           path: '',
  //           component: AllCoursesComponent,
  //         },
  //         {
  //           path: ':id',
  //           component: ManageCourseComponent,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
