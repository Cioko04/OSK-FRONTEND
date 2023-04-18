
import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { PasswordIdentityDirective } from 'src/app/shared/password-identity.directive';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UniqueEmailValidator } from 'src/app/shared/UniqueEmailValidator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup | any;
  user$;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private passwordIdentity: PasswordIdentityDirective,
    private emailValidator: UniqueEmailValidator,
    private auth: AuthenticationService
  ) {
    this.user$ = this.userService.getUserByEmail(this.auth.getSessionUserEmail());
  }

  ngOnInit(): void {
    this.initUserForm();
    this.updateValueInUserForm();
  }

  get name() {
    return this.userForm.get('name');
  }

  get secondName() {
    return this.userForm.get('secondName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get secondPassword() {
    return this.userForm.get('secondPassword');
  }

  onSubmit(valid: any) {
    if (valid) {
      this.update();
    }
  }

  update() {
    let user: User = {};
    this.user$.subscribe({
      next: (v) => {
        user.id = v.id;
        user.name = this.userForm.value.name;
        user.secondName = this.userForm.value.secondName;
        user.lastName = this.userForm.value.lastName;
        user.password = this.userForm.value.password;
        user.dob = this.userForm.value.dob;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.userService.updateUser(user);
        this.eventBack.emit('submit');
      },
    });
  }

  back(backMsg: string) {
    this.eventBack.emit(backMsg);
  }

  initUserForm() {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [Validators.minLength(3)]),
        secondName: new FormControl('', [Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.minLength(2)]),
        dob: new FormControl('', [
          Validators.required,
          this.userService.checkAge,
        ]),
        // email: new FormControl('', {
        //   validators: [Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
        //   asyncValidators: [
        //     this.emailValidator.validate.bind(this.emailValidator),
        //   ],
        // }),
        password: new FormControl('', [Validators.minLength(6)]),
        secondPassword: new FormControl('', []),
      },
      { validators: this.passwordIdentity.passwordIdentity }
    );
  }

  updateValueInUserForm() {
    this.user$.subscribe((data) => {
      this.userForm.patchValue({
        name: data.name,
        secondName: data.secondName,
        lastName: data.lastName,
        dob: data.dob,
        email: data.email,
        password: data.password,
        secondPassword: data.password,
      });
    });
  }
}
