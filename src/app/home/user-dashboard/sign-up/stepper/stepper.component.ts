import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgTemplateNameDirective } from 'src/app/shared/directive/ng-template-name.directive';

export interface StepDetail {
  label: string;
  name: string;
  template?: TemplateRef<any>;
  control?: FormControl;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChildren(NgTemplateNameDirective)
  private templates!: QueryList<NgTemplateNameDirective>;

  formGroup = this.formBuilder.group({
    chooseCategory: ['', Validators.required],
    chooseSchool: ['', Validators.required],
  });

  steps: StepDetail[] = [];

  isStepperLoaded: boolean = false;

  @Input()
  stepDetails: StepDetail[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit() {
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
