import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { MyErrorHandlerServiceService } from '../../errorHandlers/my-error-handler.service';
import { CategoryService } from '../category/category.service';
import { Course } from './course';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private API_URL = '/api/course';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandler: MyErrorHandlerServiceService,
    private categoryService: CategoryService
  ) {}

  loadCourses(schoolId: number) {
    this.getCoursesBySchoolId(schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((courses) => {
        this.coursesSubject.next(courses);
        this.categoryService.loadCategories(
          courses.map((course) => course.categoryType)
        );
      });
  }

  getCoursesBySchoolId(id: number): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.API_URL + '/getCoursesBySchoolId/' + id)
      .pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
  }

  saveCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.API_URL + '/save', course).pipe(
      tap((savedCourse: Course) => {
        this.addCourseToList(savedCourse);
      }),
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  private addCourseToList(addedCourse: Course): void {
    const currentCourses = this.coursesSubject.value;
    const updatedCourses = [...currentCourses, addedCourse];
    this.coursesSubject.next(updatedCourses);
  }

  updateCourse(course: Course) {
    return this.http.put(this.API_URL + '/updateCourse', course).pipe(
      map((updatedCourse: any) => updatedCourse as Course),
      tap((updatedCourse: Course) => {
        this.updateCourseInList(updatedCourse);
      }),
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  private updateCourseInList(updatedCourse: Course) {
    const currentCourses = this.coursesSubject.value;
    const updatedCourses = currentCourses.map((course) => {
      return course.id === updatedCourse.id ? updatedCourse : course;
    });
    this.coursesSubject.next(updatedCourses);
  }

  deleteCourse(id: number) {
    return this.http.delete(this.API_URL + '/deleteCourseById/' + id).pipe(
      tap((deletedCourseId: any) => {
        this.updateCoursesAfterDeletion(deletedCourseId);
      }),
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  private updateCoursesAfterDeletion(deletedCourseId: number): void {
    const currentCourses = this.coursesSubject.value;
    const updatedCourses = currentCourses.filter(
      (course) => course.id !== deletedCourseId
    );
    this.coursesSubject.next(updatedCourses);
  }

  public getCourseById(id: number): Course {
    return this.coursesSubject.getValue().find((course) => course.id === id)!;
  }
}
