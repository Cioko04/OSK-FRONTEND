import { Component, OnInit } from '@angular/core';
import { CardDetails } from 'src/app/shared/common/card/card.component';
import { BaseStep } from '../../core/base-step';

@Component({
  selector: 'app-choose-course',
  templateUrl: './choose-course.component.html',
  styleUrls: ['./choose-course.component.css'],
})
export class ChooseCourseComponent extends BaseStep implements OnInit {
  courses: CardDetails[] = [
    {
      label: '<b>Ilość zapisanych studentów</b>: <i>10/30</i>',
      imagePath: '../../../../assets/course.png',
      aspectRatio: '8/3',
      accentColor: `hsl(70, 80%, 40%)`,
      showDetails: true,
      height: 40
    },
  ];

  constructor() {
    super();
  }

  ngOnInit() {}
}
