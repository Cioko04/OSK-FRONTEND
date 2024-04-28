import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { Instructor } from './instructor';
import { User } from '../user/user';

@UntilDestroy()
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
    this.getInstructorsBySchoolId(schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((instructors) => {
        this.instructorSubject.next(instructors);
      });
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

  getInstructorName(userRequest: User): string {
    let fullName = userRequest.name;
    if (userRequest.secondName) {
      fullName += ' ' + userRequest.secondName;
    }
    if (userRequest.lastName) {
      fullName += ' ' + userRequest.lastName;
    }
    return fullName!;
  }
}
