import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, startWith, take } from 'rxjs';

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

  onChange: any = () => {};
  onTouched: any = () => {};

  @Input()
  valuesObs: Observable<string[]> | any;

  @Output()
  valuesChange = new EventEmitter<string[]>();

  set value(values: string[]) {
    values.forEach((value) => this.removeValueFromList(value, this.valuesObs));
    this.chosenValues = values;
    this.chosenValues.sort();
  }

  get values() {
    return this.form.controls.values;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      values: [],
    });
  }

  ngOnInit(): void {
    this.valuesObs.pipe(untilDestroyed(this)).subscribe((data: string[]) => {
      this.valuesObs = this.updateValuesInList(data, this.values.valueChanges);
    });
  }

  select(event: MatAutocompleteSelectedEvent): void {
    if (!this.chosenValues.includes(event.option.viewValue)) {
      this.chosenValues.push(event.option.viewValue);
      this.removeValueFromList(event.option.viewValue, this.valuesObs);
    }
    this.values.setValue(null);
  }

  remove(value: string): void {
    const index = this.chosenValues.indexOf(value);

    if (index >= 0) {
      this.chosenValues.splice(index, 1);

      this.valuesObs
        .pipe(
          untilDestroyed(this),
          map((items: any) => {
            items.push(value);
            return items;
          }),
          map((values: string[]) => values.slice().sort()),
          take(1)
        )
        .subscribe((result: any) => {
          this.valuesObs = this.updateValuesInList(
            result,
            this.values.valueChanges
          );
        });
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

  private _filter(value: string, data: any): string[] {
    const filterValue = value.toLowerCase();
    return data.filter((item: string) =>
      item.toLowerCase().includes(filterValue)
    );
  }

  private removeValueFromList(
    event: string,
    listObs: Observable<string[]>
  ): void {
    listObs
      .pipe(
        untilDestroyed(this),
        map((items: any) => items.filter((item: any) => item !== event)),
        take(1)
      )
      .subscribe((result: any) => {
        this.valuesObs = this.updateValuesInList(
          result,
          this.values.valueChanges
        );
      });
  }

  private updateValuesInList(
    data: string[],
    valueChanges: Observable<string>
  ): Observable<string[]> {
    this.chosenValues.sort();
    this.onChange(this.chosenValues);
    this.onTouched();
    return valueChanges.pipe(
      startWith(null),
      map((value: string | null) =>
        value ? this._filter(value, data) : data.slice()
      )
    );
  }
}
