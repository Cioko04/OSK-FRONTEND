import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BaseFormComponent } from './core/base-form/BaseFormComponent';
import { FormType } from './core/data-types/FormType';
import { FormSettings } from './core/data-types/FormSettings';
import { SignInFormSettings } from './core/data-types/SignInFormSettings';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  FormType = FormType;
  submitForm: boolean = false;

  @Input()
  entity: any;
  @Input()
  signInFormSettings!: SignInFormSettings;
  @Input()
  formSettings!: FormSettings;

  @Output()
  entityChange = new EventEmitter<any>();

  @ViewChild('form') formComponent!: BaseFormComponent;

  constructor() {
  }

  ngOnInit(): void {}

  submit(): void {
    this.entityChange.emit(this.entity);
  }

  triggerSubmit() {
    if (this.formComponent) {
      this.formComponent.submit();
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    this.triggerSubmit();
  }
}
