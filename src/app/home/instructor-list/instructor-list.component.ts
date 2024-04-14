import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import {
  BaseEntityComponent,
  HeadArray,
} from '../../shared/core/BaseEntityComponent';
import { EMPTY, Observable, of } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
})
export class InstructorListComponent
  extends BaseEntityComponent
  implements OnInit
{
  override headArray: HeadArray[] = [
    { Head: 'Imię', FieldName: 'userRequest', SecondField: 'name' },
    { Head: 'Nazwisko', FieldName: 'userRequest', SecondField: 'lastName' },
    { Head: 'Email', FieldName: 'userRequest', SecondField: 'email' },
    { Head: 'Wiek', FieldName: 'userRequest', SecondField: 'age' },
    { Head: 'Kategorie', FieldName: 'categories' },
  ];

  instructor: Instructor | any;
  instructors$!: Observable<Instructor[]>;
  signInFormSettings: SignInFormSettings = {
    user: false,
    instructor: false,
    school: false,
  };

  formSettings: FormSettings = {
    formType: FormType.SIGNUP,
    buttonText: 'Zapisz',
    titile: 'Dodaj instruktora!',
  };

  constructor(
    modalService: NgbModal,
    private userService: UserService,
    private instructorService: InstructorService,
    private auth: AuthenticationService
  ) {
    super(modalService);
    this.signInFormSettings.instructor = true;
    this.signInFormSettings.user = true;
  }

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService
      .getUserByEmail(email)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          this.instructor = {};
          this.instructor.userRequest = {};
          let schoolId = user.schoolRequest!.id;
          this.instructor.schoolId = schoolId;
          this.instructorService.updateInstructorSubject(schoolId!);
          this.instructors$ = this.instructorService.instructorSubject$;
        },
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {
          console.log('Instructors loaded!');
        },
      });
  }

  override onDelete(id: number) {
    this.instructorService
      .deleteInstructor(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {
          console.log('Deleted!');
          this.ngOnInit();
        },
      });
  }

  override onAdd(content: any) {
    this.formSettings.edit = false;
    this.formSettings.titile = 'Dodaj instruktora!';
    super.onAdd(content);
  }

  override onEdit(content: any, instructor: Instructor) {
    this.formSettings.edit = true;
    this.formSettings.titile = 'Edytuj instruktora!';
    this.instructor = instructor;
    super.onEdit(content, instructor);
  }

  onSubmit() {
    this.formSettings.edit ? this.update() : this.add();
  }

  update() {
    this.instructorService
      .updateInstructor(this.instructor)
      .pipe(untilDestroyed(this))
      .subscribe({
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
    this.instructorService
      .register(this.instructor)
      .pipe(untilDestroyed(this))
      .subscribe({
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
