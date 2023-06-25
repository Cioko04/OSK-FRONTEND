import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface CategoryFormValues {
  categories: string[];
}

const CATEGORIES: string[] = [
  'AM',
  'A1',
  'A2',
  'A',
  'B2',
  'B',
  'B+E',
  'C',
  'C1',
  'C1+E',
  'C+E',
  'D',
  'D1',
  'D1+E',
  'D+E',
  'T',
  'Tramwaj',
];

@UntilDestroy()
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css', '../form-style.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryFormComponent),
      multi: true,
    },
  ],
})
export class CategoryFormComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @ViewChild(MatChipList)
  chipList!: MatChipList;

  categories: string[] = CATEGORIES;
  options: string[] = ['Zaznacz wszystkie', 'Usuń wszystkie'];

  value: string[] = [];

  onChange!: (value: string[]) => void;
  onTouch: any;

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string[]): void {
    if (this.chipList && value) {
      this.selectChips(value);
    } else if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.selectChips(this.value);
    this.cdr.detectChanges();

    this.chipList.chipSelectionChanges
      .pipe(
        untilDestroyed(this),
        map((event) => event.source)
      )
      .subscribe((chip) => {
        if (chip.selected) {
          this.value = [...this.value, chip.value];
        } else {
          this.value = this.value.filter((o) => o !== chip.value);
        }

        this.propagateChange(this.value);
      });
  }

  propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
  }

  selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
  }

  selectAll(){
    this.chipList.chips.forEach((chip) => chip.select());
  }

  deselectAll() {
    this.chipList.chips.forEach((chip) => chip.deselect());
  }
}
