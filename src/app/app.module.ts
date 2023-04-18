import { AuthenticationInterceptorProvider } from './authentication/authentication.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { PasswordIdentityDirective } from './shared/password-identity.directive';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './logo/logo.component';
import { MenuNavComponent } from './home/menu-nav/menu-nav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeNavComponent } from './welcome/welcome-nav/welcome-nav.component';
import { LoginRegistrationComponent } from './welcome/login-registration/login-registration.component';
import { LoginComponent } from './welcome/login-registration/login/login.component';
import { RegistrationComponent } from './welcome/login-registration/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { CoursesComponent } from './home/courses/courses.component';
import { MyCoursesComponent } from './home/courses/my-courses/my-courses.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AdminMenuComponent } from './home/admin-menu/admin-menu.component';
import { SchoolListComponent } from './home/admin-menu/school-list/school-list.component';
import { EditSchoolComponent } from './home/admin-menu/school-list/edit-school/edit-school.component';
@NgModule({
  declarations: [
    AppComponent,
    PasswordIdentityDirective,
    LogoComponent,
    MenuNavComponent,
    WelcomeComponent,
    WelcomeNavComponent,
    LoginRegistrationComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PaymentsComponent,
    CoursesComponent,
    MyCoursesComponent,
    UserProfileComponent,
    AdminMenuComponent,
    SchoolListComponent,
    EditSchoolComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthenticationService, AuthenticationInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
