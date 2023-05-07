import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { School } from './school';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getSchools(): Observable<Array<School>> {
    return this.http.get<Array<School>>(this.API_URL).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  addSchool(school: School) {
    this.http.post(this.API_URL + '/register', school).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
  }
}
