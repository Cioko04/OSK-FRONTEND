import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup | any;

  @Output()
  eventBack = new EventEmitter<string>();

  private _failed = new Subject<string>();
  failMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._failed.subscribe((message) => (this.failMessage = message));

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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
      .then(() => {
        this.eventBack.emit('submit');
        this.router.navigate(['']);
      })
      .catch((serverLoginError: any) => {
        this.handleError(serverLoginError);
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.popUpFailMessage();
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  public popUpFailMessage() {
    this._failed.next(`Błędne dane logowania`);
  }
}
