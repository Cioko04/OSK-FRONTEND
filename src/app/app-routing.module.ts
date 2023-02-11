import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { MainContentComponent } from './start-content/main-content/main-content.component';



const routes: Routes = [
  {path: '', canActivate:[AuthenticationGuard], children: [
    {path: '', component: SideNavBarComponent},
    {path: 'welcome', component: MainContentComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
