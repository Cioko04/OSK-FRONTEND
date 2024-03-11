import {
  Component,
  ViewChild
} from '@angular/core';
import { BaseFormComponent } from './core/base-form/BaseFormComponent';
import { FormType } from './core/data-types/FormType';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent extends BaseFormComponent {
  FormType = FormType;
  submitForm: boolean = false;

  @ViewChild('form') formComponent!: BaseFormComponent;

  constructor() {
    super();
  }

  override ngOnInit(): void {}

  override submit(): void {
    this.entityChange.emit(this.entity);
  }

  triggerSubmit() {
    if (this.formComponent) {
      this.formComponent.submit();
    }
  }
}
