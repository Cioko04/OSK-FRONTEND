import {
  NgbOffcanvasConfig,
  NgbOffcanvas,
  OffcanvasDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { School } from './../../../school/school';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  text: string = 'ośrodek';
  closeResult = '';
  schoolsToEdit: School[] | any;
  schools: School[] = [
    {
      id: 1,
      name: 'Start',
      owner: 'John Smith',
      city: 'Los Angeles',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2020-01-01',
      check: false,
    },
    {
      id: 2,
      name: 'LG',
      owner: 'Angelina Kaj',
      city: 'Warszawa',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2021-01-01',
      check: false,
    },
    {
      id: 3,
      name: 'Drive',
      owner: 'Elżbieta Sidenko',
      city: 'Gdańsk',
      zipCode: '03-890',
      nip: '92180923809128',
      date: '2019-01-01',
      check: false,
    },
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  check(school: School) {
    school.check = !school.check;
    this.shouldDisplayPlural();
  }

  deleteSchool() {
    this.schools = this.schools.filter((e) => !e.check);
  }

  private shouldDisplayPlural() {
    this.text =
      this.schools.filter((e) => e.check).length > 1 ? 'ośrodki' : 'ośrodek';
  }

  editSchool(content: any) {
    this.schoolsToEdit = this.schools.filter((e) => e.check);
    this.modalService.open(content).result.then(
      (result) => {
        this.uncheck();
      },
      (reason) => {
        this.uncheck();
      }
    );
  }

  private uncheck() {
    this.schools.forEach((element) => {
      element.check = false;
    });
  }

  canEdit(): boolean {
    return this.schools.filter((e) => e.check).length > 0 ? false : true;
  }
}
