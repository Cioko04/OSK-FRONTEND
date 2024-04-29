import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/services/school/school';
import { SchoolService } from 'src/app/shared/services/school/school.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModificationContent } from 'src/app/shared/utils/table/table-list/table-list.component';
import { BaseEntityComponent, HeadArray } from 'src/app/shared/core/BaseEntityComponent';

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

  onDeleteEntity(deleteContent: ModificationContent) {
    this.schoolService.deleteSchool(deleteContent.id!).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.ngOnInit();
      },
    });
  }

  override onOpenAddForm(content: any) {
    this.fromSettings.edit = false;
    this.school.userRequest = {};
    super.onOpenAddForm(content);
  }

  override onOpenEditForm(content: any, editContent: ModificationContent) {
    this.fromSettings.edit = true;
    this.school = this.schools.find(school => school.id === editContent.id);
    super.onOpenEditForm(content);
  }

  onFormSubmit() {
    this.fromSettings.edit ? this.onUpdateEntity() : this.onAddEntity();
  }

  onUpdateEntity() {
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

  onAddEntity() {
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
