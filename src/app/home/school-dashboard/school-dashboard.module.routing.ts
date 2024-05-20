import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { AllCoursesComponent } from './manage-courses/all-courses/all-courses.component';
import { ManageCourseComponent } from './manage-courses/manage-course/manage-course.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';

const schoolDashboardRoutes: Routes = [
  {
    path: 'instructors',
    component: InstructorListComponent,
  },
  {
    path: 'manage-courses',
    component: ManageCoursesComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(schoolDashboardRoutes)],
  exports: [RouterModule],
})
export class SchoolDashboardRoutingModule {}
