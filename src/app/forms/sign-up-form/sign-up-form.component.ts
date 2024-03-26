import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { School } from 'src/app/shared/services/school/school';
import { User } from 'src/app/shared/services/user/user';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent extends BaseFormComponent implements OnInit {
  email: string = '';
  categories: string[] = Object.values(CategoryEnum);
  submitForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
      categories: [],
    });
    if (this.edit) {
      this.patchValues();
    }
  }

  override submit(): void {
    this.updateValueAndValidity();
    this.submit();
  }

  updateValueAndValidity() {
    this.submitForm = true;
    this.form.get('profile')?.updateValueAndValidity();
    this.form.get('password')?.updateValueAndValidity();
    this.form.get('school')?.updateValueAndValidity();
  }

  override patchEntity() {
    if (this.signInFormSettings.school) {
      this.createSchool(this.entity);
    } else if (this.signInFormSettings.instructor) {
      this.createInstructor(this.entity);
    } else if (this.signInFormSettings.user) {
      this.createUser(this.entity);
    }
  }

  private createInstructor(instructor: Instructor) {
    this.createUser(instructor.userRequest!);
    instructor.categories = this.form.value.categories;
  }

  private createUser(user: User) {
    user.name = this.form.value.profile.name;
    user.secondName = this.form.value.profile.secondName;
    user.lastName = this.form.value.profile.lastName;
    user.email = this.form.value.profile.email;
    user.password = this.form.value.password.password;
    user.dob = this.form.value.profile.dob;
  }

  private createSchool(school: School) {
    school.schoolName = this.form.value.school.schoolName;
    school.city = this.form.value.school.city;
    school.zipCode = this.form.value.school.zipCode;
    school.nip = this.form.value.school.nip;
    if (this.signInFormSettings.user) {
      this.createUser(school.userRequest);
    }
  }

  override patchValues() {
    if (this.signInFormSettings.school) {
      this.patchSchool(this.entity);
      if (this.signInFormSettings.user) {
        this.patchUser(this.entity.userRequest);
      }
    } else if (this.signInFormSettings.instructor) {
      this.patchUser(this.entity.userRequest);
      this.patchCategories(this.entity.categories);
    } else if (this.signInFormSettings.user) {
      this.patchUser(this.entity);
    }
  }

  private patchUser(user: User) {
    this.email = user.email;
    this.form.get('profile')?.patchValue({
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
    });
    this.form.get('password')?.patchValue({
      password: user.password,
      confirmPassword: user.password,
    });
  }

  private patchSchool(school: School) {
    this.form.get('school')?.patchValue({
      schoolName: school.schoolName,
      city: school.city,
      zipCode: school.zipCode,
      nip: school.nip,
    });
  }

  private patchCategories(categories: string[]) {
    this.form.get('categories')?.patchValue(categories);
  }
}
