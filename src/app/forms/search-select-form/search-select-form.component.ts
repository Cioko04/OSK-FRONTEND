import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, startWith } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-search-select-form',
  templateUrl: './search-select-form.component.html',
  styleUrls: ['./search-select-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchSelectFormComponent),
      multi: true,
    },
  ],
})
export class SearchSelectFormComponent implements OnInit {
  form: FormGroup | any;
  chosenValues: string[] = [];
  leftValues: string[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input()
  valuesObs: Observable<string[]> = new Observable<string[]>();

  set value(values: string[]) {
    this.chosenValues = values;
    values.forEach((value) => this.removeValueFromList(value, this.leftValues));
  }

  get values() {
    return this.form.controls.values;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      values: [[]],
    });
  }

  ngOnInit(): void {
    this.valuesObs.pipe(untilDestroyed(this)).subscribe((values: string[]) => {
      this.updateValuesInList(values, this.values.valueChanges);
    });
  }

  select(value: string): void {
    if (!this.chosenValues.includes(value)) {
      this.chosenValues.push(value);
      this.removeValueFromList(value, this.leftValues);
    }
    this.values.setValue(null);
  }

  remove(value: string): void {
    const index = this.chosenValues.indexOf(value);

    if (index >= 0) {
      this.chosenValues.splice(index, 1);
      this.leftValues.push(value);
      this.updateValuesInList(this.leftValues, this.values.valueChanges);
    }
  }

  writeValue(value: any): void {
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
    return null;
  }

  addAll() {
    this.leftValues.forEach((value) => this.select(value));
  }

  removeAll() {
    this.chosenValues.slice().forEach((value) => {
      this.remove(value);
    });
  }

  private _filter(value: string, data: any): string[] {
    const filterValue = value.toLowerCase();
    return data.filter((item: string) =>
      item.toLowerCase().includes(filterValue)
    );
  }

  private removeValueFromList(value: string, values: string[]): void {
    const filteredValues = values.filter((item: any) => item !== value);
    this.updateValuesInList(filteredValues, this.values.valueChanges);
  }

  private updateValuesInList(
    data: string[],
    valueChanges: Observable<string>
  ): void {
    this.chosenValues.sort();
    this.onChange(this.chosenValues);
    this.onTouched();
    valueChanges
      .pipe(
        startWith(null),
        map((value: string | null) =>
          value ? this._filter(value, data) : data.slice()
        )
      )
      .subscribe((result: string[]) => {
        this.leftValues = result;
        this.leftValues.sort();
      });
  }
}
