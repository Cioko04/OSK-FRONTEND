import {
  Component,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  UntypedFormControl,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UniqueEmailValidator } from '../validators/UniqueEmailValidator';
import { adultly } from '../validators/validators';

export interface ProfileFormValues {
  name: string;
  secondName?: string;
  lastName: string;
  dob: string;
  email: string;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: [
    './profile-form.component.css',
    '../form-style.css',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    },
  ],
})
export class ProfileFormComponent
  implements ControlValueAccessor, OnDestroy, OnChanges, OnInit
{
  profileForm: UntypedFormGroup | any;
  subscriptions: Subscription[] = [];
  @Input()
  submitted: boolean = false;
  @Input()
  emailToCompare: string = "";

  get value(): ProfileFormValues {
    return this.profileForm.value;
  }

  set value(value: ProfileFormValues) {
    this.profileForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get name() {
    return this.profileForm.get('name');
  }

  get secondName() {
    return this.profileForm.get('secondName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get dob() {
    return this.profileForm.get('dob');
  }

  get email() {
    return this.profileForm.get('email');
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private emailValidator: UniqueEmailValidator
  ) {
  }
  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submitted) {
      this.profileForm.markAllAsTouched();
    }
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      secondName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required, adultly]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
        [this.emailValidator.checkEmailValidity(this.emailToCompare)],
        ,
      ],
    });
    this.subscriptions.push(
      this.profileForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
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
      this.profileForm.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: UntypedFormControl) {
    return this.profileForm.valid ? null : { profile: { valid: false } };
  }
}
