import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { SchoolService } from 'src/app/shared/services/school/school.service';

export interface CourseSearchDetails {
  cities: string[];
  categories: string[];
}

@UntilDestroy()
@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css'],
})
export class CourseSearchComponent implements OnInit {
  form!: FormGroup;

  categories: string[] = Object.values(CategoryEnum);
  cities: string[] = [];

  @Output()
  onSearch: EventEmitter<CourseSearchDetails> =
    new EventEmitter<CourseSearchDetails>();

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService
  ) {
    this.form = this.formBuilder.group({
      cities: [[]],
      categories: [[]],
    });
  }

  ngOnInit() {
    this.schoolService
      .getCities()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => (this.cities = cities));

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((form) => {
      this.onSearch.emit({
        cities: form.cities,
        categories: form.categories,
      });
    });
  }
}
