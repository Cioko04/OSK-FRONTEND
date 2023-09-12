import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { Course } from './course';

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

  updateCourse(course: Course) {
    return this.http.put(this.API_URL + '/updateCourse', course).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  deleteCourse(id: number) {
    return this.http.delete(this.API_URL + '/deleteCourseById/' + id);
  }
}
