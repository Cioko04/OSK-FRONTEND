import { NgModule } from '@angular/core';
import { FormModule } from 'src/app/forms/form.module';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { AdminDashboardRoutingModule } from './admin-dashboard.module.routing';

@NgModule({
  imports: [FormModule, TableModule, AdminDashboardRoutingModule],
  declarations: [SchoolListComponent],
})
export class AdminDashboardModule {}
