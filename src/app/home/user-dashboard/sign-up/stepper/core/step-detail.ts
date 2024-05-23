import { TemplateRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { StepType } from "./step-type.enum";

export interface StepDetail {
    label: string;
    type: StepType;
    templates?: TemplateRef<any>[];
    control?: FormControl;
  }