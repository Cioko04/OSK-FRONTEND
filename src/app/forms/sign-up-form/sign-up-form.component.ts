import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
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
  user: User | any;
  @Input()
  school: School | any;
  @Input()
  initProperForm: any;

  @Output()
  userChange = new EventEmitter<User>();
  @Output()
  schoolChange = new EventEmitter<School>();
  @Output()
  onSubmit = new EventEmitter<any>();

  signupForm: FormGroup;
  submitted: boolean = false;
  buttonText: string = 'Zarejestruj';

  constructor(private formBuilder: FormBuilder) {
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
      this.school = {};
    }
  }

  submit() {
    this.submitted = true;
    this.signupForm.get('profile')?.updateValueAndValidity();
    this.signupForm.get('password')?.updateValueAndValidity();
    this.signupForm.get('school')?.updateValueAndValidity();
    if (this.signupForm.valid) {
      this.register();
      this.onSubmit.emit();
    }
  }

  private register() {
    if (!this.initProperForm.showOnlySchool) {
      this.createUser();
      // this.userChange.emit(this.user);
      console.log(this.user);
    }
    if (this.initProperForm.isFromSchool) {
      this.createSchool();
      // this.schoolChange.emit(this.school);
      console.log(this.school);
    }
  }

  private createUser() {
    this.user.name = this.signupForm.value.profile.name;
    this.user.secondName = this.signupForm.value.profile.secondName;
    this.user.lastName = this.signupForm.value.profile.lastName;
    this.user.email = this.signupForm.value.profile.email;
    this.user.password = this.signupForm.value.password.password;
    this.user.dob = this.signupForm.value.profile.dob;
    if(!this.initProperForm.isFromSchool) {
      this.user.categories = this.signupForm.value.categories;
    }
  }

  private createSchool() {
    this.school.schoolName = this.signupForm.value.school.schoolName;
    this.school.city = this.signupForm.value.school.city;
    this.school.zipCode = this.signupForm.value.school.zipCode;
    this.school.nip = this.signupForm.value.school.nip;
    this.school.categories = this.signupForm.value.categories;
  }

  private patchValues() {
    if (!this.initProperForm.showOnlySchool) {
      this.patchUser();
      if(!this.initProperForm.isFromSchool) {
        this.patchCategories(this.user.categories);
      }
    }
    if (this.initProperForm.isFromSchool) {
      this.patchSchool();
      this.patchCategories(this.school.categories);
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
      schoolName: this.school.schoolName,
      city: this.school.city,
      zipCode: this.school.zipCode,
      nip: this.school.nip,
    });
  }

  private patchCategories(categories: string[]) {
    this.signupForm.get('categories')?.patchValue(categories);
  }
}
