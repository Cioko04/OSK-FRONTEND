import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

enum CourseType {
  PRACTICE = 'Praktyka',
  THEORY = 'Teoria',
}

@Component({
  selector: 'app-schedule-group-form',
  templateUrl: './schedule-group-form.component.html',
  styleUrls: ['./schedule-group-form.component.css'],
})
export class ScheduleGroupFormComponent extends BaseFormComponent {
  courseTypes: string[] = Object.values(CourseType);
  instructors: Instructor[] = [];
  categoryType!: CategoryEnum;
  form: FormGroup;

  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      courseType: ['', [Validators.required]],
      instructor: ['', [Validators.required]],
      information: [''],
    });
  }

  ngOnInit() {
    this.setInstructors();
    if (this.formSettings.edit) {
      this.patchValues();
    }
  }

  override submit(): void {
    if (this.form.valid) {
      this.setEntityValues();
      this.entityChange.emit(this.entity);
    }
  }

  private setEntityValues() {
    this.entity.type = this.courseType.value;
    this.entity.instructor = this.instructor.value;
  }

  get courseType(): FormControl {
    return this.form.controls['courseType'] as FormControl;
  }

  get instructor(): FormControl {
    return this.form.controls['instructor'] as FormControl;
  }

  get information(): FormControl {
    return this.form.controls['information'] as FormControl;
  }

  private setInstructors() {
    this.route.paramMap.subscribe((params) => {
      this.courseService.courses$.subscribe((courses) => {
        let course = courses.find(
          (course) => course.id === parseInt(params.get('id')!)
        );
        this.instructorService.instructorSubject$.subscribe(
          (instructors) =>
            (this.instructors = instructors.filter((instructor) =>
              instructor.categories.includes(course?.categoryType!)
            ))
        );
      });
    });
  }

  getInstructorName(userRequest: any): string {
    return this.instructorService.getInstructorName(userRequest);
  }

  private patchValues() {
    this.form.patchValue({
      courseType: this.entity.type,
      instructor: this.entity.instructor,
      information: this.entity.information,
    });
  }
}
