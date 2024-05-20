import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { LessonSignUpComponent } from './lesson-sign-up/lesson-sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
      },
      {
        path: 'course',
        component: CourseSignUpComponent,
      },
      {
        path: 'lesson',
        component: LessonSignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
