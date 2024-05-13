import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoModule } from '../logo/logo.module';
import { HomeComponent } from './home.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormModule } from '../forms/form.module';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [RouterModule, LogoModule, FormModule, HomeRoutingModule, CommonModule, NgbModule],
  declarations: [
    UserProfileComponent,
    SchoolProfileComponent,
    MenuNavComponent,
    HomeComponent,
  ],
})
export class HomeModule {}
