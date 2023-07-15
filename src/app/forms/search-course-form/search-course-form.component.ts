import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  Observable,
  startWith,
  map,
  take,
} from 'rxjs';

@Component({
  selector: 'app-search-course-form',
  templateUrl: './search-course-form.component.html',
  styleUrls: ['./search-course-form.component.css'],
})
export class SearchCourseFormComponent {
  form: FormGroup | any;

  chosenValues: string[] = [];

  @Input()
  dataObs: Observable<string[]> | any;

  @Output()
  valuesChange = new EventEmitter<string[]>();

  get values() {
    return this.form.get('values');
  }

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      values: [],
    });

    this.dataObs.subscribe((data: string[]) => {
      this.dataObs = this.updateValuesInList(data, this.values.valueChanges);
    });
  }

  private updateValuesInList(data: string[], valueChanges: Observable<string>): Observable<string[]> {
    return valueChanges.pipe(
      startWith(null),
      map((value: string | null) =>
        value ? this._filter(value, data) : data.slice()
      )
    );
  }

  select(event: MatAutocompleteSelectedEvent): void {
    if (!this.chosenValues.includes(event.option.viewValue)) {
      this.chosenValues.push(event.option.viewValue);

      this.removeValueFromList(event, this.dataObs).subscribe(
        (result: any) => {
          this.dataObs = this.updateValuesInList(
            result,
            this.values.valueChanges
          );
        }
      );

      this.valuesChange.emit(this.chosenValues);
    }
    this.values.setValue(null);
  }

  private removeValueFromList(event: MatAutocompleteSelectedEvent, listObs: Observable<string[]>): Observable<string[]> {
    return listObs.pipe(
      map((items: any) =>
        items.filter((item: any) => item !== event.option.viewValue)
      ),
      take(1)
    );
  }

  remove(value: string): void {
    const index = this.chosenValues.indexOf(value);

    if (index >= 0) {
      this.chosenValues.splice(index, 1);

      this.dataObs
        .pipe(
          map((items: any) => {
            items.push(value);
            return items;
          }),
          take(1)
        )
        .subscribe((result: any) => {
          this.dataObs = this.updateValuesInList(
            result,
            this.values.valueChanges
          );
        });

      this.valuesChange.emit(this.chosenValues);
    }
  }

  private _filter(value: string, data: any): string[] {
    const filterValue = value.toLowerCase();
    return data.filter((item: string) =>
      item.toLowerCase().includes(filterValue)
    );
  }
}
