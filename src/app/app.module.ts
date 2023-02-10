import { RequestInterceptor } from './request.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainContentComponent } from './start-content/main-content/main-content.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { LoginPageComponent } from './login-registery/login-component/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './login-registery/register-component/register-page.component';
import { LoginRegisteryFormComponent } from './login-registery/login-registery-form/login-registery-form.component';
import { TopNavBarComponent } from './start-content/top-nav-bar/top-nav-bar.component';
import { UserComponent } from './user/user.component';
import { UserHttpService } from './user/http/user-http.service';
import { UserService } from './user/service/user.service';
import { PasswordIdentityDirective } from './shared/password-identity.directive';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    TopNavBarComponent,
    MenuContentComponent,
    SideNavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoginRegisteryFormComponent,
    UserComponent,
    PasswordIdentityDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [UserHttpService, UserService, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
