import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Role, User } from 'src/app/user/user';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css', './semipolar.css'],
})
export class LoginRegistrationComponent {
  initProperForm = { isFromSchool: false, update: false, showOnlySchool: false, showCategories: false };

  @Input()
  openPage = '';

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private auth: AuthenticationService) {}

  register(user: User) {
    user.role = Role.USER;
    this.auth.register(user).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e.status);
      },
      complete: () => {
        console.log('Registered!');
        this.eventBack.emit('submited');
      },
    });
  }

  back(backMsg: string) {
    this.eventBack.emit(backMsg);
  }
}
