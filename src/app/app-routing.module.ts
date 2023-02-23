import { HomePageComponent } from './home/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { MainContentComponent } from './start-content/main-content/main-content.component';



const routes: Routes = [
  {path: '', canActivate:[AuthenticationGuard], children: [
    {path: '', component: HomePageComponent},
    {path: 'welcome', component: MainContentComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
