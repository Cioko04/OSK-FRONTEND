import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { Course } from 'src/app/shared/services/course/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css', '../form-style.css'],
})
export class CourseFormComponent implements OnInit {
  form: FormGroup | any;
  categories: string[] = Object.values(CategoryEnum);

  @Input()
  categoriesFromSchool: string[] = [];
  @Input()
  course: Course | any;
  @Input()
  updateCourse: boolean = false;

  @Output()
  courseChange = new EventEmitter<Course>();
  @Output()
  onSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.setCategories();
    if (this.updateCourse) {
      this.patchValues();
    }
  }

  private setCategories() {
    this.categories = this.categories.filter(
      (category) => !this.categoriesFromSchool.includes(category)
    );
    if (this.course.categoryType) {
      this.categories.push(this.course.categoryType);
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
    this.course.price = this.price.value;
    this.course.description = this.description.value;
    this.course.categoryType = this.category.value;
  }

  private patchValues() {
    this.form.patchValue({
      price: this.course.price,
      category: this.course.categoryType,
      description: this.course.description,
    });
  }
}
