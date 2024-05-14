import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/forms/form.module';
import { CommonModule } from 'src/app/shared/common/common.module';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { CourseSignUpMenuComponent } from './course-sign-up-menu/course-sign-up-menu.component';
import { CourseSignUpComponent } from './course-sign-up.component';
import { CommonModule as AngularCommon } from '@angular/common';
import { CourseSignUpRoutingModule } from './course-sign-up-routing.module';

@NgModule({
  imports: [RouterModule, CommonModule, FormModule, MatDividerModule, AngularCommon, CourseSignUpRoutingModule],
  declarations: [
    CourseSignUpComponent,
    CourseSignUpMenuComponent,
    ChooseCategoryComponent,
  ],
  exports: [],
})
export class CourseSignUpModule {}
