import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyErrorHandlerServiceService } from '../shared/my-error-handler.service';
import { Observable, catchError } from 'rxjs';
import { Instructor } from './instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private API_URL = '/api/instructor';

  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {}

  register(instructor: Instructor) {
    return this.http.post(this.API_URL + '/register', instructor).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  getInstructorsBySchoolId(id: number): Observable<Instructor[]> {
    return this.http
      .get<Instructor[]>(this.API_URL + '/getInstructorsBySchoolId/' + id)
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  updateInstructor(instructor: Instructor) {
    return this.http.put(this.API_URL + '/updateInstructor', instructor).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  deleteInstructor(id: number) {
    return this.http.delete(this.API_URL + '/deleteInstructorById/' + id);
  }
}
