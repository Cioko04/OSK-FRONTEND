import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { School } from './../../../school/school';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  shouldAddSchool: boolean = true;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  deleteSchool(school: School) {
    this.schools = this.schools.filter((element) => element !== school);
  }

  editAddSchool(content: any, school: School, shouldAddSchool: boolean) {
    this.school = school;
    this.shouldAddSchool = shouldAddSchool;
    this.modalService.open(content).result.then(
      (result) => {
        if(this.shouldAddSchool) {
          this.addSchool();
        }
        this.school = {};
      },
      (reason) => {
        this.school = {};
      }
    );
  }

  private addSchool() {
    if (Object.values(this.school).filter(value => typeof value === 'undefined').length == 0){
      this.schools.push(this.school);
    };
  }
}
