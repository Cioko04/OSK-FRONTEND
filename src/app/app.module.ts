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
import { MyCoursesComponent } from './home/my-courses/my-courses.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { AuthenticationService } from './authentication/authentication.service';
import { SchoolListComponent } from './home/school-list/school-list.component';
import { SignUpFormComponent } from './forms/sign-up-form/sign-up-form.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { PasswordFormComponent } from './forms/password-form/password-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SchoolFormComponent } from './forms/school-form/school-form.component';
import { InstructorListComponent } from './home/instructor-list/instructor-list.component';
import { TableComponent } from './table/table.component';
import { SchoolProfileComponent } from './home/school-profile/school-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { CustomPaginatorIntl } from './providers/CustomPaginatorIntl';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchSelectFormComponent } from './forms/search-select-form/search-select-form.component';
import {MatDialogModule} from '@angular/material/dialog';
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
