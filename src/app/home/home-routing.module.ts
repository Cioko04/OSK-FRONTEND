import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from '../authentication/has-role.guard';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [HasRoleGuard],
        data: {
          role: 'USER',
        },
        loadChildren: () =>
          import('./user-dashboard/user-dashboard.module').then(
            (m) => m.UserDashboardModule
          ),
      },
      {
        path: 'dashboard',
        canActivate: [HasRoleGuard],
        data: {
          role: 'OSK_ADMIN',
        },
        loadChildren: () =>
          import('./school-dashboard/school-dashboard.module').then(
            (m) => m.SchoolDashboardModule
          ),
      },
      {
        path: 'dashboard',
        canActivate: [HasRoleGuard],
        data: {
          role: 'ADMIN',
        },
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
