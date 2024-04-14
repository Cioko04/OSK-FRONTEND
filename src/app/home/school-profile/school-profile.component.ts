import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { School } from 'src/app/shared/services/school/school';
import { SchoolService } from 'src/app/shared/services/school/school.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';

@UntilDestroy()
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css'],
})
export class SchoolProfileComponent {
  signInFormSettings: SignInFormSettings = {
    school: true,
    instructor: false,
    user: false,
  };

  fromSettings: FormSettings = {
    formType: FormType.SIGNUP,
    buttonText: "Zapisz",
    edit: true
  }

  @Input()
  school: School | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private schoolService: SchoolService) {}

  updateSchool(school: School) {
    this.schoolService.updateSchool(school).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e);
      },
      complete: () => {
        console.log('Updated!');
        this.eventBack.emit('submit');
      },
    });
  }
}
