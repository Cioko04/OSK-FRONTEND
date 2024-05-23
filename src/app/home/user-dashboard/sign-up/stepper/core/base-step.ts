import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'app-base-step',
  template: '',
})
export abstract class BaseStep {
  @Output()
  onChoose: EventEmitter<string | number> = new EventEmitter();

  choose(value: string | number) {
    this.onChoose.emit(value);
  }
}
