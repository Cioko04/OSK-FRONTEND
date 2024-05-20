import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PasswordFormComponent } from './common/password-form/password-form.component';
import { ProfileFormComponent } from './common/profile-form/profile-form.component';
import { SchoolFormComponent } from './common/school-form/school-form.component';
import { SearchSelectFormComponent } from './common/search-select-form/search-select-form.component';
import { TimePickerComponent } from './common/time-picker/time-picker.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { FormComponent } from './form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleGroupFormComponent } from './schedule-group-form/schedule-group-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxMaterialTimepickerModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    SignUpFormComponent,
    ScheduleGroupFormComponent,
    ScheduleFormComponent,
    LoginFormComponent,
    CourseSearchComponent,
    CourseFormComponent,
    PasswordFormComponent,
    ProfileFormComponent,
    SchoolFormComponent,
    SearchSelectFormComponent,
    TimePickerComponent,
    FormComponent
  ],
  exports: [
    CourseSearchComponent,
    SearchSelectFormComponent,
    FormComponent
  ],
})
export class FormModule {}
