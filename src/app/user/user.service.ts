import { MyErrorHandlerServiceService } from '../shared/errorHandlers/my-error-handler.service';
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

  updateUser(user: User) {
    return this.http.put(this.API_URL + '/updateUser', user).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(this.API_URL + '/delete/' + id);
  }
}
