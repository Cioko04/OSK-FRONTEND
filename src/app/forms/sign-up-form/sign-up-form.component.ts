import { Component } from '@angular/core';
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
export class SignUpFormComponent extends BaseFormComponent {
  email: string = '';
  signupForm!: FormGroup;
  categories: string[] = Object.values(CategoryEnum);
  submitForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
      categories: [],
    });
    if (this.formSettings.edit) {
      this.patchValues();
    }
  }

  override submit(): void {
    this.updateValueAndValidity();
    if (this.signupForm.valid) {
      this.createEntity();
      this.entityChange.emit(this.entity);
    }
  }

  updateValueAndValidity() {
    this.submitForm = true;
    this.signupForm.get('profile')?.updateValueAndValidity();
    this.signupForm.get('password')?.updateValueAndValidity();
    this.signupForm.get('school')?.updateValueAndValidity();
  }

  private createEntity() {
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
    instructor.categories = this.signupForm.value.categories;
  }

  private createUser(user: User) {
    user.name = this.signupForm.value.profile.name;
    user.secondName = this.signupForm.value.profile.secondName;
    user.lastName = this.signupForm.value.profile.lastName;
    user.email = this.signupForm.value.profile.email;
    user.password = this.signupForm.value.password.password;
    user.dob = this.signupForm.value.profile.dob;
  }

  private createSchool(school: School) {
    school.schoolName = this.signupForm.value.school.schoolName;
    school.city = this.signupForm.value.school.city;
    school.zipCode = this.signupForm.value.school.zipCode;
    school.nip = this.signupForm.value.school.nip;
    if (this.signInFormSettings.user) {
      this.createUser(school.userRequest);
    }
  }

  private patchValues() {
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
    this.signupForm.get('profile')?.patchValue({
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
    });
    this.signupForm.get('password')?.patchValue({
      password: user.password,
      confirmPassword: user.password,
    });
  }

  private patchSchool(school: School) {
    this.signupForm.get('school')?.patchValue({
      schoolName: school.schoolName,
      city: school.city,
      zipCode: school.zipCode,
      nip: school.nip,
    });
  }

  private patchCategories(categories: string[]) {
    this.signupForm.get('categories')?.patchValue(categories);
  }
}
