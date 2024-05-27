import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/forms/form.module';
import { CommonModule as OskCommon } from 'src/app/shared/common/common.module';
import { NgTemplateNameDirective } from 'src/app/shared/directive/ng-template-name.directive';
import { ChooseCategoryComponent } from './stepper/steps/choose-category/choose-category.component';
import { ChooseSchoolComponent } from './stepper/steps/choose-school/choose-school.component';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { LessonSignUpComponent } from './lesson-sign-up/lesson-sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { StepperComponent } from './stepper/stepper.component';
import { ChooseCourseComponent } from './stepper/steps/choose-course/choose-course.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { OskDirectiveModule } from 'src/app/shared/directive/osk-directive.module';

@NgModule({
  imports: [
    RouterModule,
    OskCommon,
    FormModule,
    MatDividerModule,
    AngularCommon,
    SignUpRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    TableModule,
    OskDirectiveModule
  ],
  declarations: [
    SignUpComponent,
    MenuComponent,
    ChooseCategoryComponent,
    ChooseSchoolComponent,
    ChooseCourseComponent,
    StepperComponent,
    CourseSignUpComponent,
    LessonSignUpComponent,

  ],
  exports: [],
})
export class SignUpModule {}
