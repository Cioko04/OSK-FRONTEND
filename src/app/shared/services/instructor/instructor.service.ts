import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Instructor } from './instructor';
import { Schedule } from '../schedule/schedule';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private instructorSubject = new BehaviorSubject<Instructor[]>([]);
  instructorSubject$ = this.instructorSubject.asObservable();

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

  updateInstructorSubject(schoolId: number) {
    this.instructorSubject$ = this.getInstructorsBySchoolId(schoolId);
  }

  countInstructorsBySchoolId(id: number): Observable<number> {
    return this.http
      .get<number>(this.API_URL + '/countInstructorBySchool/' + id)
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
