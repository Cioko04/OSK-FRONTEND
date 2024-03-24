import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { BaseFormComponent } from '../core/base-form/BaseFormComponent';

enum CourseType {
  PRACTICE = 'Praktyka',
  THEORY = 'Teoria',
}

@Component({
  selector: 'app-schedule-group-form',
  templateUrl: './schedule-group-form.component.html',
  styleUrls: ['./schedule-group-form.component.css'],
})
export class ScheduleGroupFormComponent
  extends BaseFormComponent
  implements OnInit
{
  courseTypes: string[] = Object.values(CourseType);
  instructors: Instructor[] = [];
  categoryType!: CategoryEnum;

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
    if (this.edit) {
      this.patchValues();
    }
  }

  override patchEntity() {
    this.entity.type = this.courseType.value;
    this.entity.instructor = this.instructor.value;
  }

  override patchValues() {
    this.form.patchValue({
      courseType: this.entity.type,
      instructor: this.entity.instructor,
      information: this.entity.information,
    });
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
}
