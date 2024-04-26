import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';
import { ToastService } from 'src/app/shared/common/toast/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  private _failed = new Subject<string>();
  failMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this._failed.subscribe((message) => (this.failMessage = message));
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  override patchEntity(): void {
    throw new Error('Method not implemented.');
  }
  override patchValues(): void {
    throw new Error('Method not implemented.');
  }

  override submit(): void {
    this.authenticationService
      .authenticate({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe({
        next: () => {
          this.entityChange.emit();
          this.router.navigate(['/home']);
        },
        error: (e) => {this._failed.next(`Błąd logowania`); this.toastService.openFailToast("Błąd logowania!")},
        complete: () => this.toastService.openSuccesToast("Pomyślnie zalogowano!"),
      });
  }
}
