import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChooseCategoryComponent } from "./choose-category/choose-category.component";
import { CourseSignUpMenuComponent } from "./course-sign-up-menu/course-sign-up-menu.component";
import { CourseSignUpComponent } from "./course-sign-up.component";
import { ChooseSchoolComponent } from "./choose-school/choose-school.component";

const routes: Routes = [
    {
      path: 'course-sign-up',
      component: CourseSignUpComponent,
      children: [
        {
          path: '',
          component: CourseSignUpMenuComponent,
        },
        {
          path: 'choose-category',
          component: ChooseCategoryComponent,
        },
        {
          path: ':category/choose-school',
          component: ChooseSchoolComponent,
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CourseSignUpRoutingModule {}