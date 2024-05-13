import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const welcomeRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(welcomeRoutes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
