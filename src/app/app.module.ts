import { AuthenticationInterceptorProvider } from './authentication/authentication.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './logo/logo.component';
import { MenuNavComponent } from './home/menu-nav/menu-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeNavComponent } from './welcome/welcome-nav/welcome-nav.component';
import { LoginRegistrationComponent } from './welcome/login-registration/login-registration.component';
import { HomeComponent } from './home/home.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { CoursesComponent } from './home/courses/courses.component';
import { MyCoursesComponent } from './home/courses/my-courses/my-courses.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { AuthenticationService } from './authentication/authentication.service';
import { SchoolListComponent } from './home/school-list/school-list.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { PasswordFormComponent } from './forms/password-form/password-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SchoolFormComponent } from './forms/school-form/school-form.component';
import { InstructorListComponent } from './home/instructor-list/instructor-list.component';
import { TableComponent } from './tables/table/table.component';
import { SchoolProfileComponent } from './home/school-profile/school-profile.component';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import {
  MatLegacyPaginatorIntl as MatPaginatorIntl,
  MatLegacyPaginatorModule as MatPaginatorModule,
} from '@angular/material/legacy-paginator';
import { CustomPaginatorIntl } from './providers/CustomPaginatorIntl';
import { MatSortModule } from '@angular/material/sort';
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
    CategoryFormComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
