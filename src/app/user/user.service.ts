import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Array<User>>(this.API_URL).subscribe({
      next: (users) => this.users.next(users),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('complete'),
    });
  }

  getUserByEmail(email: string | any): Observable<User> {
    return this.http
      .get<User>(this.API_URL + '/' + email);
  }

  updateUser(user: User) {
    this.http
      .put(this.API_URL + '/update/' + user.id, user)
      .subscribe({
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
