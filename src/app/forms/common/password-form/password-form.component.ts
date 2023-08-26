import { Component, Input, OnChanges, OnDestroy, SimpleChanges, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { matchPassword } from '../validators/validators';
export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: [
    './password-form.component.css',
    '../../sign-up-form/sign-up-form.component.css',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true,
    },
  ],
})
export class PasswordFormComponent implements ControlValueAccessor, OnDestroy, OnChanges {
  passwordForm: FormGroup | any;
  subscriptions: Subscription[] = [];

  @Input()
  submitted: boolean = false;

  get value(): PasswordFormValues {
    return this.passwordForm.value;
  }

  set value(value: PasswordFormValues) {
    this.passwordForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get password() {
    return this.passwordForm.controls.password;
  }

  get confirmPassword() {
    return this.passwordForm.controls.confirmPassword;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        password: [
          '',
          { validators: [Validators.required, Validators.minLength(6)] },
        ],
        confirmPassword: ['', { validators: [Validators.required] }],
      },
      { validators: matchPassword }
    );

    this.subscriptions.push(
      this.passwordForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submitted){
      this.passwordForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.passwordForm.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.passwordForm.valid ? null : { passwords: { valid: false } };
  }
}
