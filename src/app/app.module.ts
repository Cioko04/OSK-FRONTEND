import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationInterceptorProvider } from './authentication/authentication.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { PasswordFormComponent } from './forms/common/password-form/password-form.component';
import { ProfileFormComponent } from './forms/common/profile-form/profile-form.component';
import { SchoolFormComponent } from './forms/common/school-form/school-form.component';
import { SearchSelectFormComponent } from './forms/common/search-select-form/search-select-form.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { CoursesComponent } from './home/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { InstructorListComponent } from './home/instructor-list/instructor-list.component';
import { MenuNavComponent } from './home/menu-nav/menu-nav.component';
import { MyCoursesComponent } from './home/my-courses/my-courses.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { SchoolListComponent } from './home/school-list/school-list.component';
import { SchoolProfileComponent } from './home/school-profile/school-profile.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { LogoComponent } from './logo/logo.component';
import { CustomPaginatorIntl } from './providers/CustomPaginatorIntl';
import { CategoryCarouselComponent } from './table/category-carousel/category-carousel.component';
import { TableComponent } from './table/table.component';
import { UserService } from './shared/services/user/user.service';
import { LoginRegistrationComponent } from './welcome/login-registration/login-registration.component';
import { WelcomeNavComponent } from './welcome/welcome-nav/welcome-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ManageCoursesComponent } from './home/manage-courses/manage-courses.component';
import { InfoCardComponent } from './home/manage-courses/info-card/info-card.component';
import { CourseFormComponent } from './forms/course-form/course-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    MenuNavComponent,
    WelcomeComponent,
    WelcomeNavComponent,
    LoginRegistrationComponent,
    HomeComponent,
    PaymentsComponent,
    CoursesComponent,
    MyCoursesComponent,
    UserProfileComponent,
    SchoolListComponent,
    SignUpFormComponent,
    ProfileFormComponent,
    PasswordFormComponent,
    LoginFormComponent,
    SchoolFormComponent,
    InstructorListComponent,
    TableComponent,
    SchoolProfileComponent,
    SearchSelectFormComponent,
    CategoryCarouselComponent,
    ManageCoursesComponent,
    InfoCardComponent,
    CourseFormComponent,
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthenticationInterceptorProvider,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
