import {
  ProfileFormComponent,
  ProfileFormValues,
} from './../profile-form/profile-form.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { School } from 'src/app/school/school';
import { SchoolService } from 'src/app/school/school.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
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

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private userService: UserService,
    private schoolService: SchoolService
  ) {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
    });
  }

  ngOnInit(): void {
    if (this.shouldUpdateUser) {
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
    this.shouldUpdateUser
      ? this.userService.updateUser(this.user)
      : this.auth.register(this.user);
    if (this.shouldUpdateSchool) {
      this.schoolService.updateSchool(this.school);
    }
    this.eventBack.emit('submit');
  }

  private createUser() {
    this.user.name = this.signupForm.value.profile.name;
    this.user.secondName = this.signupForm.value.profile.secondName;
    this.user.lastName = this.signupForm.value.profile.lastName;
    this.user.email = this.signupForm.value.profile.email;
    this.user.password = this.signupForm.value.password.password;
    this.user.dob = this.signupForm.value.profile.dob;
    if (this.shouldCreateSchool) {
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
    if (this.shouldUpdateSchool) {
      this.signupForm.get('school')?.patchValue({
        schoolName: this.user.schoolRequest.schoolName,
        city: this.user.schoolRequest.city,
        zipCode: this.user.schoolRequest.zipCode,
        nip: this.user.schoolRequest.nip,
      });
    }
  }
}
