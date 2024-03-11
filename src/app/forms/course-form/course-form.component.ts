import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Course } from 'src/app/shared/services/course/course';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent extends BaseFormComponent {
  form: FormGroup | any;
  categories: string[] = Object.values(CategoryEnum);

  @Output()
  courseChange = new EventEmitter<Course>();
  @Output()
  onSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
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
    this.categories = this.categories.filter(
      (category) => !this.categoriesFromSchool.includes(category)
    );
    if (this.entity.categoryType) {
      this.categories.push(this.entity.categoryType);
    }
    this.categories.sort();
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
      this.setCourseValues();
      this.onSubmit.emit();
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
