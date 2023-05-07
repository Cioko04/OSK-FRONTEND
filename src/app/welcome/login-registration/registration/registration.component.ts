import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/user/user';
import { UniqueEmailValidator } from '../../../forms/validators/UniqueEmailValidator';
import { matchPassword } from 'src/app/forms/validators/validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private auth: AuthenticationService,
    private emailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        secondName: new FormControl('', [Validators.minLength(3)]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        dob: new FormControl('', [Validators.required, this.checkAge]),
        email: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          ],
          asyncValidators: [
            this.emailValidator.validate.bind(this.emailValidator),
          ],
        }),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        secondPassword: new FormControl('', [Validators.required]),
      },
      { validators: matchPassword }
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
    if (valid) {
      this.add();
    }
  }

  add() {
    const user: User = {
      name: this.userForm.value.name,
      secondName: this.userForm.value.secondName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      dob: this.userForm.value.dob,
    };
    this.auth.register(user);
    this.eventBack.emit('submit');
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
