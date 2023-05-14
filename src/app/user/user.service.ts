import { MyErrorHandlerServiceService } from '../shared/my-error-handler.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { User } from './user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = '/api/user';
  private users = new BehaviorSubject<Array<User>>([]);

  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {}

  getUsers() {
    return this.http.get<Array<User>>(this.API_URL).subscribe({
      next: (users) => this.users.next(users),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('complete'),
    });
  }

  getUserByEmail(email: string | any): Observable<User> {
    let queryParams = new HttpParams().append('email', email);
    return this.http
      .get<User>(this.API_URL + '/getUserByEmail', {
        params: queryParams,
      })
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  getUsersWithSchool() {
    return this.http
      .get<Array<User>>(this.API_URL + '/getUsersWithSchools')
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  updateUser(user: User) {
    this.http.put(this.API_URL + '/update/' + user.id, user).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
  }

  deleteUser(id: number) {
    console.log(this.API_URL + '/delete/' + id);
    this.http.delete(this.API_URL + '/delete/' + id).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('deleted'),
    });
  }
}
