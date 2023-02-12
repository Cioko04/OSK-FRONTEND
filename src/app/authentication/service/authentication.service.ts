import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private sessionId: any = '';
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
          next: (response) => {
            resolve(response);
            this.setToken(response);
          },
          error: (err) => reject(err),
          complete: () => console.info('complete'),
        });
    });
  }

  setToken(res: any) {
    this.sessionId = res.sessionId;
    sessionStorage.setItem('token', this.sessionId);
  }
}
