import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { Observable, catchError } from 'rxjs';
import { Course } from './course';
import { Instructor } from '../instructor/instructor';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = '/api/course';
  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService
  ) {}

  getCoursesBySchoolId(id: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.API_URL + '/getCoursesBySchoolId/' + id)
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  saveCourse(course: Course) {
     return this.http.post(this.API_URL + '/save', course).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }
}
