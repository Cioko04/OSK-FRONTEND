import { RequestInterceptor } from './authentication/request.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainContentComponent } from './start-content/main-content/main-content.component';
import { LoginPageComponent } from './login-registration/login-component/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopNavBarComponent } from './start-content/top-nav-bar/top-nav-bar.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/service/user.service';
import { PasswordIdentityDirective } from './shared/password-identity.directive';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationPageComponent } from './login-registration/registration-component/registration-page.component';
import { LoginRegistrationFormComponent } from './login-registration/login-registration-form/login-registration-form.component';
import { AuthenticationService } from './authentication/service/authentication.service';
import { LogoComponent } from './logo/logo.component';
import { MenuNavComponent } from './home/menu-nav/menu-nav.component';
import { HomeTopNavComponent } from './home/home-top-nav/home-top-nav.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { KursyComponent } from './home/kursy/kursy.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    TopNavBarComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    LoginRegistrationFormComponent,
    UserComponent,
    PasswordIdentityDirective,
    LogoComponent,
    MenuNavComponent,
    HomeTopNavComponent,
    HomePageComponent,
    KursyComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthenticationService, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
