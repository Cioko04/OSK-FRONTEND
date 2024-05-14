import { NgModule } from "@angular/core";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FormModule } from "../forms/form.module";
import { LogoModule } from "../logo/logo.module";
import { LoginRegistrationComponent } from "./login-registration/login-registration.component";
import { WelcomeNavComponent } from "./welcome-nav/welcome-nav.component";
import { WelcomeComponent } from "./welcome.component";
import { WelcomeRoutingModule } from "./welcome-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        NgbCarouselModule,
        LogoModule,
        FormModule,
        WelcomeRoutingModule,
        CommonModule
    ],
    declarations: [
        WelcomeComponent,
        WelcomeNavComponent,
        LoginRegistrationComponent
    ],
    exports: [WelcomeComponent]
  })
  export class WelcomeModule {}