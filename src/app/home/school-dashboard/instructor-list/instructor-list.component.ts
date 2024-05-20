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
} from '../../../shared/core/BaseEntityComponent';
import { EMPTY, Observable, of } from 'rxjs';
import { ModificationContent } from 'src/app/shared/utils/table/table-list/table-list.component';

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
    { head: 'Imię', fieldName: 'userRequest', secondField: 'name' },
    { head: 'Nazwisko', fieldName: 'userRequest', secondField: 'lastName' },
    { head: 'Email', fieldName: 'userRequest', secondField: 'email' },
    { head: 'Wiek', fieldName: 'userRequest', secondField: 'age' },
    { head: 'Kategorie', fieldName: 'categories' },
  ];

  instructor: Instructor | any;
  instructors: Instructor[] = [];
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
          this.instructorService.instructorSubject$.subscribe(instructors => this.instructors = instructors);
        },
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {
          console.log('Instructors loaded!');
        },
      });
  }

  override onDeleteEntity(deleteContent: ModificationContent) {
    this.instructorService
      .deleteInstructor(deleteContent.id!)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: (e: HttpErrorResponse) => console.log(e.status),
        complete: () => {
          console.log('Deleted!');
          this.ngOnInit();
        },
      });
  }

  override onOpenAddForm(content: any) {
    this.formSettings.edit = false;
    this.formSettings.titile = 'Dodaj instruktora!';
    super.onOpenAddForm(content);
  }

  override onOpenEditForm(content: any, editContent: ModificationContent) {
    this.formSettings.edit = true;
    this.formSettings.titile = 'Edytuj instruktora!';
    this.instructor = this.instructors.find(instructor => instructor.id === editContent.id);
    super.onOpenEditForm(content);
  }

  onFormSubmit() {
    this.formSettings.edit ? this.onUpdateEntity() : this.onAddEntity();
  }

  onUpdateEntity() {
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

  onAddEntity() {
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
