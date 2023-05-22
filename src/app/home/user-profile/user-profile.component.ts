import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {

  @Input()
  user: User | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor() {}
}
