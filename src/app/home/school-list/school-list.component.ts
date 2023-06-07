import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SchoolService } from 'src/app/school/school.service';
import { Observable } from 'rxjs';
import { School } from 'src/app/school/school';
import { HeadArray, List } from '../interface/list';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit, List {
  headArray: HeadArray[] = [
    { Head: 'Nazwa', FieldName: 'schoolName' },
    { Head: 'Właściciel', FieldName: 'userRequest', SecondField: 'name' },
    { Head: 'Miejscowość', FieldName: 'city' },
    { Head: 'Data dodania', FieldName: 'addDate' },
  ];

  initProperForm = { isFromSchool: true, update: false };
  school: School | any;
  schoolObs: Observable<School[]> = new Observable<School[]>();

  constructor(
    private modalService: NgbModal,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.schoolObs = this.schoolService.getSchools();
  }

  onDelete(id: number) {
    this.schoolService.deleteSchool(id).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.ngOnInit();
      },
    });
  }

  onAdd(content: any) {
    this.initProperForm.update = false;
    this.school = {};
    this.openForm(content);
  }

  onEdit(content: any, school: School) {
    this.initProperForm.update = true;
    this.school = school;
    this.openForm(content);
  }

  onSubmit() {
    this.initProperForm.update ? this.update() : this.add();
  }

  update() {
    this.schoolService.updateSchool(this.school).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.ngOnInit();
      },
      complete: () => {
        console.log('Updated!');
        this.ngOnInit();
      },
    });
  }

  add() {
    this.schoolService.register(this.school).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e.status);
      },
      complete: () => {
        console.log('Registered!');
        this.ngOnInit();
      },
    });
  }

  openForm(content: any) {
    this.modalService.open(content);
  }
}
