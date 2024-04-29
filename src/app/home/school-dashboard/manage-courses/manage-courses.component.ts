import { Component, OnInit } from '@angular/core';

export interface CardContent {
  title: string;
  class: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
})
export class ManageCoursesComponent implements OnInit {
  schoolId?: number;

  cardsContentArray: CardContent[] = [
    { title: 'Kursanci', class: 'students', icon: 'fa-users', count: 1 },
    { title: 'Instruktorzy', class: 'instructors', icon: 'fa-users', count: 1 },
    {
      title: 'Trwające kursy',
      class: 'ongoing-courses',
      icon: 'fa-refresh',
      count: 1,
    },
    {
      title: 'Zakończone kursy',
      class: 'completed-courses',
      icon: 'fa-graduation-cap',
      count: 1,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
