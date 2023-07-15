import { MyErrorHandlerServiceService } from '../shared/errorHandlers/my-error-handler.service';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  tap,
  BehaviorSubject,
  throwError,
  catchError,
  Observable,
  map,
} from 'rxjs';
import { User } from '../user/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly API_URL = 'api/auth';
  private readonly TOKEN_NAME = 'token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return sessionStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {
    this._isLoggedIn$.next(!!this.token);
  }

  getHttpOptions(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };
  }

  authenticate(userLoginData: { email: string; password: string }) {
    return this.http
      .post(this.API_URL + '/authenticate', userLoginData, { responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          return this.errorHandler.handleError(error);
        }),
        map((response: any) => {
          this._isLoggedIn$.next(true);
          const token = response;
          this.setToken(token);
        })
      );
  }

  register(user: User) {
    return this.http.post(this.API_URL + '/register', user).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  existsByEmail(email: string): Observable<boolean> {
    let queryParams = new HttpParams().append('email', email);
    return this.http
      .get<boolean>(this.API_URL + '/checkEmail', {
        params: queryParams,
      })
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  logout() {
    this.http.post(this.API_URL + '/logout', {}).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('Logged out!'),
    });
    this._isLoggedIn$.next(false);
    sessionStorage.clear();
  }

  getSessionUserEmail() {
    try {
      return JSON.parse(atob(this.token!.split('.')[1])).sub;
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

  getSessionUserRole() {
    try {
      return JSON.parse(atob(this.token!.split('.')[1])).role;
    } catch (e) {
      this.errorHandler.handleError(e);
    }
  }

  private setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_NAME, token);
  }
}
