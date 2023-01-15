import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-registery-form',
  templateUrl: './login-registery-form.component.html',
  styleUrls: ['./login-registery-form.component.css','./semipolar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginRegisteryFormComponent implements OnInit {

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
