import { Component, OnInit } from '@angular/core';
import { StepDetail } from '../stepper/core/step-detail';
import { StepType } from '../stepper/core/step-type.enum';

@Component({
  selector: 'app-course-sign-up',
  templateUrl: './course-sign-up.component.html',
  styleUrls: ['./course-sign-up.component.css'],
})
export class CourseSignUpComponent implements OnInit {
  stepDetails: StepDetail[] = [
    {
      label: 'Wybierz kategorię',
      type: StepType.CHOOSE_CATEGORY,
    },
    {
      label: 'Wybierz szkołę',
      type: StepType.CHOOSE_SCHOOL,
    },
    {
      label: 'Wybierz kurs',
      type: StepType.CHOOSE_COURSE,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
