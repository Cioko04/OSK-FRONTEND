import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-registration-form',
  templateUrl: './login-registration-form.component.html',
  styleUrls: ['./login-registration-form.component.css','./semipolar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginRegistrationFormComponent implements OnInit {

  @Input()
  openPage = '';

  @Output()
  eventBack = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  back(backMsg: string){
    this.eventBack.emit(backMsg);
  }

}
