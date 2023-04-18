import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { School } from './../../../school/school';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  schools: School[] = [
    {
      id: 1,
      name: 'Start',
      owner: 'John Smith',
      city: 'Los Angeles',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2020-01-01',
    },
    {
      id: 2,
      name: 'LG',
      owner: 'Angelina Kaj',
      city: 'Warszawa',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2021-01-01',
    },
    {
      id: 3,
      name: 'Drive',
      owner: 'Elżbieta Sidenko',
      city: 'Gdańsk',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2019-01-01',
    },
  ];

  school: School = {};

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  deleteSchool(school: School) {
    this.schools = this.schools.filter((element) => element !== school);
  }

  editSchool(content: any, school: School) {
    this.school = school;
    this.modalService.open(content);
  }
}
