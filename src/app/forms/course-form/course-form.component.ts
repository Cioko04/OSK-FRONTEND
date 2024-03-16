import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Course } from 'src/app/shared/services/course/course';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

@UntilDestroy()
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent extends BaseFormComponent {
  form: FormGroup | any;
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
    if (this.formSettings.edit) {
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

  get category() {
    return this.form.controls.category;
  }
  get price() {
    return this.form.controls.price;
  }
  get description() {
    return this.form.controls.description;
  }

  submit() {
    if (this.form.valid) {
      console.log("x");
      this.setCourseValues();
      this.entityChange.emit(this.entity);
    }
  }

  setCourseValues() {
    this.entity.price = this.price.value;
    this.entity.description = this.description.value;
    this.entity.categoryType = this.category.value;
  }

  private patchValues() {
    this.form.patchValue({
      price: this.entity.price,
      category: this.entity.categoryType,
      description: this.entity.description,
    });
  }
}
