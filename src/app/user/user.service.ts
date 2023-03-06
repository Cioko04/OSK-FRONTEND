import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { User } from './user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = '/api/users';
  private users = new BehaviorSubject<Array<User>>([]);

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  getUsers() {
    return this.http.get<Array<User>>(this.API_URL).subscribe({
      next: (users) => this.users.next(users),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('complete'),
    });
  }

  existsByEmail(email: string): Observable<boolean> {
    let queryParams = new HttpParams().append('email', email);
    return this.http.get<boolean>(this.API_URL + '/checkEmail', {
      params: queryParams,
    });
  }

  getUserByEmail(email: string | any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.auth.getToken(),
      }),
    };
    return this.http.get<User>(this.API_URL + '/' + email, httpOptions);
  }

  addUser(user: User) {
    this.http.post(this.API_URL + '/register', user).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
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
