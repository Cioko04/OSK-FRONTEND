import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InitForm } from 'src/app/shared/core/list';
import { User } from 'src/app/shared/services/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  initProperForm: InitForm = {
    school: false,
    instructor: false,
    user: true,
    update: true,
  };

  @Input()
  user: User | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  update(user: User) {
    this.userService.updateUser(user).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e.status);
      },
      complete: () => {
        console.log('Updated!');
        this.eventBack.emit('submit');
      },
    });
  }
}
