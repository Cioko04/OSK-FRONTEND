import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../form-style.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup | any;

  @Output()
  eventBack = new EventEmitter<string>();

  private _failed = new Subject<string>();
  failMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._failed.subscribe((message) => (this.failMessage = message));
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authenticationService
      .authenticate({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: () => {
          this.eventBack.emit('submit');
          this.router.navigate(['/home']);
        },
        error: (e) => this._failed.next(`Błąd logowania`),
        complete: () => console.log('Logged in!'),
      });
  }

}
