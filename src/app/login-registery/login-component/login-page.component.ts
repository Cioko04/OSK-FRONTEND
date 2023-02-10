import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  sessionId: any = '';
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  login() {
    let url = 'api/auth/authenticate';
    const httpOptions : Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
  };
    this.http
      .post<any>(url,{email: this.model.email, password: this.model.password}, httpOptions)
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
