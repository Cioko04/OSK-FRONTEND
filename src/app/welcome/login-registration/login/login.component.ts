import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  @Output()
  eventBack = new EventEmitter<string>();

  private _failed = new Subject<string>();
  failMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
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
        this.eventBack.emit(this.email);
        this.router.navigate(['/home/courses']);
      })
      .catch((serverLoginError: any) => {
        this.handleError(serverLoginError);
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return this.popUpFailMessage(true);
    }else {
      return this.popUpFailMessage(false);
    }

  }

  public popUpFailMessage(isServerUp: boolean) {
    return isServerUp ? this._failed.next(`Błędne dane logowania`) : this._failed.next(`Serwer nie odpowiada, prosimy spróbować później`);
  }
}
