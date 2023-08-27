import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { School } from './school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private API_URL = '/api/school';
  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {}

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
