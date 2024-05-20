import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

@UntilDestroy()
@Component({
  selector: 'app-course-form', 
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent extends BaseFormComponent implements OnInit {
  categories: string[] = Object.values(CategoryEnum);

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    super();
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.setCategories();
    if (this.edit) {
      this.patchValues();
    }
  }

  private setCategories() {
    this.categoryService.categories$
      .pipe(untilDestroyed(this))
      .subscribe((categories) => {
        this.categories = this.categories.filter(
          (category) => !categories.includes(category)
        );
        if (this.entity.categoryType) {
          this.categories.push(this.entity.categoryType);
        }
        this.categories.sort();
      });
  }

  get category(): FormControl {
    return this.form.controls['category'] as FormControl;
  }
  get price() {
    return this.form.controls['price'] as FormControl;
  }
  get description() {
    return this.form.controls['description'] as FormControl;
  }

  override patchEntity() {
    this.entity.price = this.price.value;
    this.entity.description = this.description.value;
    this.entity.categoryType = this.category.value;
  }

  override patchValues() {
    this.form.patchValue({
      price: this.entity.price,
      category: this.entity.categoryType,
      description: this.entity.description,
    });
  }
}
