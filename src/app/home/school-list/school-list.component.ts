import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/services/school/school';
import { SchoolService } from 'src/app/shared/services/school/school.service';
import { HeadArray, BaseEntityComponent } from '../../shared/core/BaseEntityComponent';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent extends BaseEntityComponent  implements OnInit {
  override headArray: HeadArray[] = [
    { Head: 'Nazwa', FieldName: 'schoolName' },
    { Head: 'Właściciel', FieldName: 'userRequest', SecondField: 'name' },
    { Head: 'Miejscowość', FieldName: 'city' },
    { Head: 'Kategorie', FieldName: 'categories' },
    { Head: 'Data dodania', FieldName: 'addDate' },
  ];

  signInFormSettings: SignInFormSettings = {
    school: false,
    instructor: false,
    user: false
  };

  fromSettings: FormSettings = {
    formType: FormType.SIGNUP,
    buttonText: "Zapisz",
    edit: false
  }

  school: School | any;
  schools: School[] = [];

  constructor(
    modalService: NgbModal,
    private schoolService: SchoolService
  ) {
    super(modalService);
    this.signInFormSettings.school = true;
    this.signInFormSettings.user = true;
  }

  ngOnInit(): void {
    this.school = {};
    this.schoolService.getSchools().pipe(untilDestroyed(this)).subscribe((schools) => this.schools);
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

  override onAdd(content: any) {
    this.fromSettings.edit = false;
    this.school.userRequest = {};
    super.onAdd(content);
  }

  override onEdit(content: any, school: School) {
    this.fromSettings.edit = true;
    this.school = school;
    super.onEdit(content, school);
  }

  onSubmit() {
    this.fromSettings.edit ? this.update() : this.add();
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
}
