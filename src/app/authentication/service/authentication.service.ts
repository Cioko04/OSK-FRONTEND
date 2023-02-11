import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private sessionId: any = '';
  private API_URL = 'api/auth/authenticate';

  constructor(private http: HttpClient, private router: Router) { }

  authenticate(userLoginData: {email: string, password: string}){
    const httpOptions : Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
  };
  console.log(userLoginData);
    this.http
      .post<any>(this.API_URL, userLoginData, httpOptions)
      .subscribe((res) => {
        if (res) {
          this.sessionId = res.sessionId;
          sessionStorage.setItem('token', this.sessionId);
          this.router.navigate(['']);
        } else {
          alert('Authentication failed.');
        }
      });
  }
}
