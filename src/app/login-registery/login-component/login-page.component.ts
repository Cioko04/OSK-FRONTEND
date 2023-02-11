import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup | any;
  sessionId: any = '';
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email() {
    return this.loginForm.get('email');
  }


  get password() {
    return this.loginForm.get('password');
  }

  login() {
    let url = 'api/auth/authenticate';
    const httpOptions : Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
  };
    this.http
      .post<any>(url,{email: this.loginForm.value.email, password: this.loginForm.value.password}, httpOptions)
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
