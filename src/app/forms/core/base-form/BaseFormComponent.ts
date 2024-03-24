import { Output, Input, EventEmitter, Component, OnInit } from '@angular/core';
import { FormSettings } from '../data-types/FormSettings';
import { SignInFormSettings } from '../data-types/SignInFormSettings';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '',
})
export abstract class BaseFormComponent {
  form!: FormGroup;

  @Input()
  entity: any;
  @Input()
  signInFormSettings!: SignInFormSettings;
  @Input()
  edit!: boolean;

  @Output()
  entityChange = new EventEmitter<any>();

  abstract patchEntity(): void;

  abstract patchValues(): void;

  submit(): void {
    if (this.form.valid) {
      this.patchEntity();
      this.entityChange.emit(this.entity);
    }
  }
}
