import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Instructor } from 'src/app/instructor/instructor';
import { School } from 'src/app/school/school';
import { User } from 'src/app/user/user';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css', '../form-style.css'],
})
export class SignUpFormComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  initProperForm: any;

  @Output()
  dataChange = new EventEmitter<any>();
  @Output()
  onSubmit = new EventEmitter<any>();

  signupForm: UntypedFormGroup;
  submitted: boolean = false;
  buttonText: string = 'Zarejestruj';
  user: User | any;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
      categories: [],
    });
  }

  ngOnInit(): void {
    if (this.initProperForm.update) {
      this.buttonText = 'Zapisz';
      this.patchValues();
    } else {
      this.user = {};
    }
  }

  submit() {
    this.submitted = true;
    this.signupForm.get('profile')?.updateValueAndValidity();
    this.signupForm.get('password')?.updateValueAndValidity();
    this.signupForm.get('school')?.updateValueAndValidity();
    if (this.signupForm.valid) {
      this.register();
      this.dataChange.emit(this.data);
      this.onSubmit.emit();
    }
  }

  private register() {
    if (this.initProperForm.createSchool) {
      this.createSchool();
    } else if (this.initProperForm.createInstructor) {
      this.createInstructor();
    } else {
      this.createUser();
      this.data = this.user;
    }
  }

  private createInstructor() {
    this.createUser();
    this.data.userRequest = this.user;
    this.data.categories = this.signupForm.value.categories;
  }

  private createUser() {
    this.user.name = this.signupForm.value.profile.name;
    this.user.secondName = this.signupForm.value.profile.secondName;
    this.user.lastName = this.signupForm.value.profile.lastName;
    this.user.email = this.signupForm.value.profile.email;
    this.user.password = this.signupForm.value.password.password;
    this.user.dob = this.signupForm.value.profile.dob;
  }

  private createSchool() {
    this.data.schoolName = this.signupForm.value.school.schoolName;
    this.data.city = this.signupForm.value.school.city;
    this.data.zipCode = this.signupForm.value.school.zipCode;
    this.data.nip = this.signupForm.value.school.nip;
    this.data.categories = this.signupForm.value.categories;
    if (!this.initProperForm.createOnlySchool) {
      this.createUser();
      this.data.userRequest = this.user;
    }
  }

  private patchValues() {
    if (!this.initProperForm.hideCategories) {
      this.user = this.data.userRequest;
      if (this.initProperForm.createSchool) {
        this.patchSchool();
        this.patchCategories(this.data.categories);
      }
      this.patchCategories(this.data.categories);
    } else {
      this.user = this.data;
    }
    if (!this.initProperForm.createOnlySchool) {
      this.patchUser();
    }
  }

  private patchUser() {
    this.signupForm.get('profile')?.patchValue({
      name: this.user.name,
      secondName: this.user.secondName,
      lastName: this.user.lastName,
      dob: this.user.dob,
      email: this.user.email,
    });
    this.signupForm.get('password')?.patchValue({
      password: this.user.password,
      confirmPassword: this.user.password,
    });
  }

  private patchSchool() {
    this.signupForm.get('school')?.patchValue({
      schoolName: this.data.schoolName,
      city: this.data.city,
      zipCode: this.data.zipCode,
      nip: this.data.nip,
    });
  }

  private patchCategories(categories: string[]) {
    this.signupForm.get('categories')?.patchValue(categories);
  }
}
