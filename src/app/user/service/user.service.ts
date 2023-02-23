import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = '/api/users';
  private users = new BehaviorSubject<Array<User>>([]);
  users$ = this.users.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(this.API_URL).subscribe({
      next: (users) => this.users.next(users),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('complete'),
    });
  }

  existsByEmail(email: string): Observable<boolean>{
    let queryParams = new HttpParams().append("email",email);
    return this.http.get<boolean>(this.API_URL + '/checkEmail', {params:queryParams});
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.API_URL + '${email}');
  }

  addUser(user: User) {
    this.http.post(this.API_URL, user).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
  }


}
