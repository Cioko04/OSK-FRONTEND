import { Component, OnInit } from '@angular/core';
import { StepDetail } from '../stepper/stepper.component';

@Component({
  selector: 'app-course-sign-up',
  templateUrl: './course-sign-up.component.html',
  styleUrls: ['./course-sign-up.component.css'],
})
export class CourseSignUpComponent implements OnInit {
  stepDetails: StepDetail[] = [
    {
      label: 'Wybierz kategorię',
      name: 'chooseCategory',
    },
    {
      label: 'Wybierz szkołę',
      name: 'chooseSchool',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
