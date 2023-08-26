import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  UntypedFormGroup,
  UntypedFormBuilder,
  ControlValueAccessor,
  Validators,
  NG_VALIDATORS,
  UntypedFormControl,
} from '@angular/forms';

import { Subscription } from 'rxjs';
export interface SchoolFormValues {
  schoolName: string;
  city: string;
  zipCode: string;
  nip: string;
}

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css', '../../sign-up-form/sign-up-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchoolFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SchoolFormComponent),
      multi: true,
    },
  ],
})
export class SchoolFormComponent
  implements ControlValueAccessor, OnDestroy, OnChanges
{
  schoolForm: UntypedFormGroup | any;
  subscriptions: Subscription[] = [];

  @Input()
  submitted: boolean = false;

  get value(): SchoolFormValues {
    return this.schoolForm.value;
  }

  set value(value: SchoolFormValues) {
    this.schoolForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get schoolName() {
    return this.schoolForm.controls.schoolName;
  }
  get city() {
    return this.schoolForm.controls.city;
  }
  get zipCode() {
    return this.schoolForm.controls.zipCode;
  }
  get nip() {
    return this.schoolForm.controls.nip;
  }

  constructor(private formBuilder: UntypedFormBuilder) {
    this.schoolForm = this.formBuilder.group({
      schoolName: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      nip: ['', [Validators.minLength(3)]],
    });

    this.subscriptions.push(
      this.schoolForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submitted){
      this.schoolForm.markAllAsTouched();
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
      this.schoolForm.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: UntypedFormControl) {
    return this.schoolForm.valid ? null : { passwords: { valid: false } };
  }
}
