import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HeadArray, List } from '../../shared/core/list';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
})
export class InstructorListComponent extends List implements OnInit {
  override headArray: HeadArray[] = [
    { Head: 'Imię', FieldName: 'userRequest', SecondField: 'name' },
    { Head: 'Nazwisko', FieldName: 'userRequest', SecondField: 'lastName' },
    { Head: 'Email', FieldName: 'userRequest', SecondField: 'email' },
    { Head: 'Wiek', FieldName: 'userRequest', SecondField: 'age' },
    { Head: 'Kategorie', FieldName: 'categories' },
  ];

  instructor: Instructor | any;
  instructorsObs: Observable<Instructor[]> = new Observable<Instructor[]>();

  constructor(
    modalService: NgbModal,
    private userService: UserService,
    private instructorService: InstructorService,
    private auth: AuthenticationService
  ) {
    super(modalService);
    this.initProperForm.instructor = true;
    this.initProperForm.user = true;
    this.initProperForm.update = true;
  }

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.instructor = {};
        this.instructor.userRequest = {};
        let schoolId = user.schoolRequest!.id;
        this.instructor.schoolId = schoolId;
        this.instructorsObs =
          this.instructorService.getInstructorsBySchoolId(schoolId!);
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Instructors loaded!');
      },
    });
  }

  override onDelete(id: number) {
    this.instructorService.deleteInstructor(id).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.ngOnInit();
      },
    });
  }

  override onAdd(content: any) {
    this.initProperForm.update = false;
    super.onAdd(content);
  }

  override onEdit(content: any, instructor: Instructor) {
    this.initProperForm.update = true;
    this.instructor = instructor;
    super.onEdit(content, instructor);
  }

  onSubmit() {
    this.initProperForm.update ? this.update() : this.add();
  }

  update() {
    this.instructorService.updateInstructor(this.instructor).subscribe({
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
}
