import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { School } from './school';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private API_URL = '/api/school';
  constructor(
    private http: HttpClient
  ) {}

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/delete/' + id);
  }
}
