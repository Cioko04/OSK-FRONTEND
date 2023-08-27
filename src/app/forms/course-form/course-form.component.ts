import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEnum, Course } from 'src/app/shared/services/course/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css', '../form-style.css'],
})
export class CourseFormComponent implements OnInit {
  form: FormGroup | any;
  categories: string[] = Object.values(CategoryEnum);

  @Output()
  onSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {}

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
      this.onSubmit.emit(this.createCourse());
    }
  }

  createCourse(): Course {
    return {
      price: this.price.value,
      description: this.description.value,
      categoryType: this.category.value,
    };
  }
}
