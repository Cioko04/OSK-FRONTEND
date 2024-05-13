import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';
import { HasRoleGuard } from 'src/app/authentication/has-role.guard';

const adminDashboardRoutes: Routes = [
  {
    path: 'schools',
    component: SchoolListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminDashboardRoutes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
