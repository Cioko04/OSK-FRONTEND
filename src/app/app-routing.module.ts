import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { MainContentComponent } from './start-content/main-content/main-content.component';



const routes: Routes = [
  {path: '', canActivate:[AuthenticationGuard], children: [
    {path: '', component: SideNavBarComponent},
    {path: 'login', component: MainContentComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
