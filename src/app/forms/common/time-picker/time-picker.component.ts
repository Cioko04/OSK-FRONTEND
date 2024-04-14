import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@UntilDestroy()
@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff',
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff',
    },
  };


  // @Input()
  // date!: Date;

  // @Output()
  // dateChange = new EventEmitter<Date>();

  form: FormGroup;
  onChange: any = () => {};
  onTouched: any = () => {};

  @Input()
  label: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      time: ['', [Validators.required]],
    });

    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  set value(time: string) {
    this.form.setValue({ time: time });
    this.onChange(time);
    this.onTouched();
  }

  get value(): string {
    return this.form.value; 
  }

  get time(): FormControl {
    return this.form.controls['time'] as FormControl;
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { time: { valid: false } };
  }
}
