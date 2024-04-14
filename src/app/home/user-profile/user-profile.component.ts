import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { User } from 'src/app/shared/services/user/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  signInFormSettings: SignInFormSettings = {
    school: false,
    instructor: false,
    user: true
  };

  fromSettings: FormSettings = {
    formType: FormType.SIGNUP,
    buttonText: "Zapisz",
    edit: true
  }

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
