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
      sourceId: 1,
      label: '<b>Ilość zapisanych studentów</b>: <i>10/30</i>',
      imagePath: '../../../../assets/course.png',
      aspectRatio: '8/3',
      accentColor: `hsl(70, 80%, 40%)`,
      showDetails: true,
      extensionDetails: [
        '2023-08-12',
        '2024-11-05',
        '2022-06-21',
        '2023-04-17',
        '2024-02-09',
        '2023-10-30',
        '2022-09-18',
        '2024-07-07',
        '2022-12-29',
        '2023-05-14',
        '2023-08-12',
        '2024-11-05',
        '2022-06-21',
        '2023-04-17',
        '2024-02-09',
        '2023-10-30',
        '2022-09-18',
        '2024-07-07',
        '2022-12-29',
        '2023-05-14',
      ],
    },
  ];

  constructor() {
    super();
  }

  ngOnInit() {}
}
