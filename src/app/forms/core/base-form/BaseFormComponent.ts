import { Output, Input, EventEmitter, Component, OnInit } from '@angular/core';
import { FormSettings } from '../data-types/FormSettings';
import { SignInFormSettings } from '../data-types/SignInFormSettings';

@Component({
  selector: 'app-base-form',
  template: '',
})
export abstract class BaseFormComponent implements OnInit {
  @Input()
  entity: any;
  @Input()
  signInFormSettings!: SignInFormSettings;
  @Input()
  formSettings!: FormSettings;

  @Output()
  entityChange = new EventEmitter<any>();

  abstract submit(): void;

  abstract ngOnInit(): void;
}
