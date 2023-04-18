import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
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
      .subscribe({
        next: () => {
          this.eventBack.emit('submit');
          this.router.navigate(['/home']);
        },
        error: (e) => this.handleError(e),
        complete: () => console.log('Logged in!'),
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.popUpFailMessage(true);
    } else {
      return this.popUpFailMessage(false);
    }
  }

  public popUpFailMessage(isServerUp: boolean) {
    return isServerUp
      ? this._failed.next(`Błędne dane logowania`)
      : this._failed.next(`Serwer nie odpowiada, prosimy spróbować później`);
  }
}
