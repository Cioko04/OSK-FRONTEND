import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UniqueEmailValidator } from 'src/app/welcome/login-registration/registration/UniqueEmailValidator';
import { PasswordIdentityDirective } from 'src/app/welcome/login-registration/registration/password-identity.directive';
import { User } from '../user';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private passwordIdentity: PasswordIdentityDirective,
    private emailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [Validators.minLength(3)]),
        secondName: new FormControl('', [Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.minLength(2)]),
        dob: new FormControl('04-05-1998', [
          Validators.required,
          this.checkAge,
        ]),
        email: new FormControl('', {
          validators: [Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
          asyncValidators: [
            this.emailValidator.validate.bind(this.emailValidator),
          ],
        }),
        password: new FormControl('', [Validators.minLength(6)]),
        secondPassword: new FormControl('', []),
      },
      { validators: this.passwordIdentity.passwordIdentity }
    );
  }

  get name() {
    return this.userForm.get('name');
  }

  get secondName() {
    return this.userForm.get('secondName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get secondPassword() {
    return this.userForm.get('secondPassword');
  }

  onSubmit(valid: any) {
    // if (valid) {
    //   this.add();
    // }
  }

  add() {
    const user: User = {
      name: this.userForm.value.name,
      secondName: this.userForm.value.secondName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      password: bcrypt.hashSync(this.userForm.value.password, 10),
      dob: this.userForm.value.dob,
    };
    this.userService.addUser(user);
    this.eventBack.emit('submit');
  }

  back(backMsg: string){
    this.eventBack.emit(backMsg);
  }

  checkAge(control: AbstractControl) {
    const today = new Date();
    const birthDate = new Date(control.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 14 || age > 100 ? { age: true } : null;
  }
}
