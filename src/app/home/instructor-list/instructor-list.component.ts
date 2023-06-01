import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Instructor } from 'src/app/instructor/instructor';
import { InstructorService } from 'src/app/instructor/instructor.service';
import { UserService } from 'src/app/user/user.service';
import { HeadArray, List } from '../interface/list';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
})
export class InstructorListComponent implements OnInit, List {
  headArray: HeadArray[] = [
    { Head: 'Imię', FieldName: 'userRequest', SecondField: 'name' },
    { Head: 'Naziwsko', FieldName: 'userRequest', SecondField: 'lastName' },
    { Head: 'Wiek', FieldName: 'userRequest', SecondField: 'age' },
    { Head: 'Email', FieldName: 'userRequest', SecondField: 'email' },
  ];

  initProperForm = { isFromSchool: false, update: false };

  instructor: Instructor | any;
  instructosObs: Observable<Instructor[]> = new Observable<Instructor[]>();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private instructorService: InstructorService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.instructor = {};
        let schoolId = user.schoolRequest.id;
        this.instructor.schoolId = schoolId;
        this.instructosObs = this.instructorService.getInstructorsBySchoolId(schoolId);
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Instructors loaded!');
      },
    });
  }

  onDelete(id: number) {
    console.log(id);
    // this.instructorService.deleteInstructor(id).subscribe({
    //   error: (e: HttpErrorResponse) => console.log(e.status),
    //   complete: () => {
    //     console.log('Deleted!');
    //     this.ngOnInit();
    //   },
    // });
  }

  onAdd(content: any) {
    this.initProperForm.update = false;
    this.openForm(content);
  }

  onEdit(content: any, item: Instructor) {
    console.log(item);
    // this.initProperForm.update = true;
    // this.openForm(content);
  }

  onSubmit() {
    this.initProperForm.update ? this.update() : this.add();
  }

  update() {
    // this.schoolService.updateSchool(this.school).subscribe({
    //   error: (e: HttpErrorResponse) => {
    //     console.log(e);
    //     this.ngOnInit();
    //   },
    //   complete: () => {
    //     console.log('Updated!');
    //     this.ngOnInit();
    //   },
    // });
  }

  add() {
    this.instructorService.register(this.instructor).subscribe({
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
