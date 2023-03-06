import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private sessionId: any = '';
  private sessionUserEmail: string = '';
  private API_URL = 'api/auth/authenticate';

  constructor(private http: HttpClient) {}

  getHttpOptions(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    };
  }

  authenticate(userLoginData: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(this.API_URL, userLoginData, this.getHttpOptions())
        .subscribe({
          next: (response: string) => {
            resolve(response);
            this.setToken(response);
            this.setSessionUserEmail(userLoginData.email);
          },
          error: (err) => reject(err),
          complete: () => console.info('complete'),
        });
    });
  }

  logout() {
    this.dropToken();
    this.dropUserEmail();
    sessionStorage.clear();
  }


  private dropToken() {
    sessionStorage.removeItem('token');
  }

  private dropUserEmail() {
    sessionStorage.removeItem('email');
  }

  private setToken(res: any) {
    this.sessionId = res;
    sessionStorage.setItem('token', this.sessionId);
  }

  private setSessionUserEmail(email: any) {
    this.sessionUserEmail = email;
    sessionStorage.setItem('email', this.sessionUserEmail);
  }

  getUserEmail(){
    return sessionStorage.getItem('email');
  }

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }
}
