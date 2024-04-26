import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { SignInFormSettings } from 'src/app/forms/core/data-types/SignInFormSettings';
import { ToastService } from 'src/app/shared/common/toast/toast.service';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css', './semipolar.css'],
})
export class LoginRegistrationComponent implements OnInit {
  signInFormSettings: SignInFormSettings = {
    school: false,
    instructor: false,
    user: true,
  };

  fromSettings: FormSettings = {
    edit: false,
    titile: "OSK Zapraszamy!"
  };

  user: User | any = {};

  @Input()
  formType!: FormType;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private auth: AuthenticationService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.fromSettings.formType = this.formType;
    this.fromSettings.buttonText =
      this.formType === FormType.LOGIN ? 'Zaloguj' : 'Zarejestruj';
  }

  register(user: User) {
    if (this.formType === FormType.SIGNUP) {
      this.auth.register(user).subscribe({
        error: (e: HttpErrorResponse) => {
          console.log(e.status);
          this.toastService.openFailToast("Nie udało się zarejestrować użytkownika!");
        },
        complete: () => {
          this.toastService.openSuccesToast("Pomyślnie zarejestrowano użytkownika!");
          this.eventBack.emit();
        },
      });
    }
  }

  back() {
    this.eventBack.emit();
  }
}
