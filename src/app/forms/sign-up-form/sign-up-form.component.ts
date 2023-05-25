import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { School } from 'src/app/school/school';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css', '../form-style.css'],
})
export class SignUpFormComponent implements OnInit {
  signupForm: FormGroup;

  school: School | any;

  submitted: boolean = false;

  @Input()
  user: User | any;
  @Input()
  shouldCreateSchool: boolean = false;
  @Input()
  shouldUpdateUser: boolean = false;
  @Input()
  shouldUpdateSchool: boolean = false;

  @Input()
  initProperForm: any;

  @Output()
  userBack = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
    });
  }

  ngOnInit(): void {
    if (this.initProperForm.update) {
      this.patchValues();
      this.school = this.user.schoolRequest;
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
    }
  }

  private register() {
    this.createUser();
    this.userBack.emit(this.user);
  }

  private createUser() {
    this.user.name = this.signupForm.value.profile.name;
    this.user.secondName = this.signupForm.value.profile.secondName;
    this.user.lastName = this.signupForm.value.profile.lastName;
    this.user.email = this.signupForm.value.profile.email;
    this.user.password = this.signupForm.value.password.password;
    this.user.dob = this.signupForm.value.profile.dob;
    if (this.initProperForm.isFromSchool) {
      this.createSchool();
      this.user.schoolRequest = this.school;
    }
  }

  private createSchool() {
    let date = new Date();
    this.school.schoolName = this.signupForm.value.school.schoolName;
    this.school.city = this.signupForm.value.school.city;
    this.school.zipCode = this.signupForm.value.school.zipCode;
    this.school.nip = this.signupForm.value.school.nip;
    this.school.addDate = [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private patchValues() {
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
    if (this.initProperForm.isFromSchool) {
      this.signupForm.get('school')?.patchValue({
        schoolName: this.user.schoolRequest.schoolName,
        city: this.user.schoolRequest.city,
        zipCode: this.user.schoolRequest.zipCode,
        nip: this.user.schoolRequest.nip,
      });
    }
  }
}
