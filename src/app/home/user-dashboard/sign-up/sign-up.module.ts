import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/forms/form.module';
import { CommonModule } from 'src/app/shared/common/common.module';
import { NgTemplateNameDirective } from 'src/app/shared/directive/ng-template-name.directive';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { ChooseSchoolComponent } from './choose-school/choose-school.component';
import { MenuComponent } from './menu/menu.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { StepperComponent } from './stepper/stepper.component';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { LessonSignUpComponent } from './lesson-sign-up/lesson-sign-up.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormModule,
    MatDividerModule,
    AngularCommon,
    SignUpRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    SignUpComponent,
    MenuComponent,
    ChooseCategoryComponent,
    ChooseSchoolComponent,
    StepperComponent,
    NgTemplateNameDirective,
    CourseSignUpComponent,
    LessonSignUpComponent
  ],
  exports: [],
})
export class SignUpModule {}
