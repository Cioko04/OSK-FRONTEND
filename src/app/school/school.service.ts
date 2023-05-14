import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { School } from './school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private API_URL = '/api/school';
  constructor(
    private http: HttpClient
  ) {}

  updateSchool(school: School) {
    this.http.put(this.API_URL + '/update/' + school.id, school).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
  }
}
