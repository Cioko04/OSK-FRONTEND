import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModule } from '../forms/form.module';
import { LogoModule } from '../logo/logo.module';
import { CommonModule as OskCommon } from '../shared/common/common.module';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { WelcomeNavComponent } from './welcome-nav/welcome-nav.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    NgbCarouselModule,
    LogoModule,
    FormModule,
    WelcomeRoutingModule,
    AngularCommon,
    OskCommon,
  ],
  declarations: [
    WelcomeComponent,
    WelcomeNavComponent,
    LoginRegistrationComponent,
  ],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
