import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css','./semipolar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginRegistrationComponent implements OnInit {

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
