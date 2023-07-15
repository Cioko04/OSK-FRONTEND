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
import { MyErrorHandlerServiceService } from '../shared/errorHandlers/my-error-handler.service';

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

  getCities(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.API_URL + '/getCities').pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  getSchoolByCitiesAndCategories(
    cities: string[],
    categories: string[]
  ): Observable<Array<School>> {
    const params = {
      cities: Array.from(cities).join(','),
      categories: Array.from(categories).join(','),
    };
    return this.http
      .get<Array<School>>(this.API_URL + '/getSchoolByCitiesAndCategories', {
        params,
      })
      .pipe(
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
