import { ProfileFormComponent, ProfileFormValues } from './../profile-form/profile-form.component';
import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  signupForm: FormGroup;
  submitted: boolean = false;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
  ) {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
    });
  }

  submit(valid: any) {
    this.submitted = true;
    if (valid) {
      this.add();
    }
  }

  load(){
    this.signupForm.get('profile')?.patchValue({
      name: "data.name",
        secondName: "data.secondName",
        lastName: "data.lastName",
        dob: "data.dob",
        email: "data.email",
    });
  }

  private add() {
    const user: User = {
      name: this.signupForm.value.profile.name,
      secondName: this.signupForm.value.profile.secondName,
      lastName: this.signupForm.value.profile.lastName,
      email: this.signupForm.value.profile.email,
      password: this.signupForm.value.password.password,
      dob: this.signupForm.value.profile.dob,
    };
    this.auth.register(user);
    this.eventBack.emit('submit');
  }
}
