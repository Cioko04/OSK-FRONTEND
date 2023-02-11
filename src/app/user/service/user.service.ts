import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = '/api/users';
  private users = new BehaviorSubject<Array<User>>([]);
  users$ = this.users.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(this.apiURL).subscribe({
      next: (users) => this.users.next(users),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('complete'),
    });
  }

  existsByEmail(email: string): Observable<boolean>{
    let queryParams = new HttpParams().append("email",email);
    return this.http.get<boolean>(this.apiURL + '/checkEmail', {params:queryParams});
  }

  addUser(user: User) {
    this.http.post(this.apiURL, user).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log('saved'),
    });
  }


}
