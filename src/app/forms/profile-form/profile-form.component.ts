import {
  Component,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl,
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
    '../sign-up-form/sign-up-form.component.css',
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
  implements ControlValueAccessor, OnDestroy, OnChanges
{
  profileForm: FormGroup | any;
  subscriptions: Subscription[] = [];
  @Input()
  submitted: boolean = false;

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
    private formBuilder: FormBuilder,
    private emailValidator: UniqueEmailValidator
  ) {
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
        [this.emailValidator.validate.bind(this.emailValidator)],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submitted) {
      this.profileForm.markAllAsTouched();
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
      this.profileForm.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.profileForm.valid ? null : { profile: { valid: false } };
  }

  patchValues(){
    this.profileForm.patchValues({
      name: 'elo'
    })
  }
}
