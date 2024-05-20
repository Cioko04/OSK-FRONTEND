import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgTemplateNameDirective } from 'src/app/shared/directive/ng-template-name.directive';
import { SchoolService } from 'src/app/shared/services/school/school.service';

export interface StepDetail {
  label: string;
  name: string;
  template?: TemplateRef<any>;
  control?: FormControl;
}

@UntilDestroy()
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  steps: StepDetail[] = [];
  isStepperLoaded: boolean = false;
  cities: string[] = [];
  formGroup: FormGroup;
  hide: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChildren(NgTemplateNameDirective)
  private templates!: QueryList<NgTemplateNameDirective>;

  @Input()
  stepDetails: StepDetail[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService
  ) {
    this.formGroup = this.formBuilder.group({
      chooseCategory: ['', Validators.required],
      chooseSchool: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.schoolService
      .getCities()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => (this.cities = cities));
  }

  ngAfterViewInit(): void {
    this.stepDetails.forEach((stepDetail) =>
      this.addStep(stepDetail.label, stepDetail.name)
    );

    setTimeout(() => (this.isStepperLoaded = !!this.stepper));
  }

  get chooseCategory(): FormControl {
    return this.formGroup.controls['chooseCategory'] as FormControl;
  }
  get chooseSchool(): FormControl {
    return this.formGroup.controls['chooseSchool'] as FormControl;
  }

  private getTemplate(templateId: string): TemplateRef<any> {
    return this.templates.find((t) => t.name === templateId)!.template;
  }

  addStep(label: string, name: string) {
    if (!!this.templates && !!this.stepper) {
      this.steps.push({
        label: label,
        name: name,
        template: this.getTemplate(name),
        control: this.formGroup.get(name) as FormControl,
      });
    }
  }

  nextStep(value: string, controlName: string) {
    const control = this.formGroup.get(controlName);
    if (control) {
      control.patchValue(value);
    } else {
      console.warn(
        `Control with name "${controlName}" does not exist in the form group.`
      );
    }
    this.stepper.next();
  }
}
