import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { School } from './school';
import { User } from '../user/user';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs';
import { MyErrorHandlerServiceService } from '../shared/my-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private API_URL = '/api/school';
  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {}

  getInstructors(id: number): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(this.API_URL + '/getInstructors/' + id)
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  getSchools(): Observable<Array<School>> {
    return this.http.get<Array<School>>(this.API_URL + '/getSchools').pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  register(school: School) {
    return this.http.post(this.API_URL + '/register', school).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  updateSchool(school: School) {
    return this.http.put(this.API_URL + '/updateSchool', school).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/deleteById/' + id);
  }
}
