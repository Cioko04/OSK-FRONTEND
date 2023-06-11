import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  initProperForm = { isFromSchool: false, update: true, showOnlySchool: false, showCategories: false };

  @Input()
  user: User | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    console.log(this.user);
  }


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
