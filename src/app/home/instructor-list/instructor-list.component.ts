import { Component, OnInit } from '@angular/core';

interface Instructor {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
}

const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'Jacek',
    lastName: 'Kowal',
    age: 17,
    email: 'xyz',
  },
  {
    id: 2,
    name: 'Asia',
    lastName: 'Lejc',
    age: 18,
    email: 'kkk',
  },
  {
    id: 3,
    name: 'Mia',
    lastName: 'Malik',
    age: 26,
    email: 'mal',
  },
  {
    id: 4,
    name: 'Krystian',
    lastName: 'Fedorczuk',
    age: 30,
    email: 'fred',
  },
];

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
})
export class InstructorListComponent implements OnInit {
  instructors = INSTRUCTORS;
  headArray = [
    { Head: 'Imię', FieldName: 'name' },
    { Head: 'Naziwsko', FieldName: 'lastName' },
    { Head: 'Wiek', FieldName: 'age' },
    { Head: 'Email', FieldName: 'email' },
  ];

  constructor() {}

  ngOnInit(): void {}

  editInstructor(item: any) {
    console.log(item);
  }

  deleteInstructor(item: any) {
    console.log(item);
  }
}
