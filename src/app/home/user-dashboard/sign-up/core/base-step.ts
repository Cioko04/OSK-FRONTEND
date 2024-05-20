import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'app-base-step',
  template: '',
})
export abstract class BaseStep {
  @Output()
  onChoose: EventEmitter<string> = new EventEmitter();

  choose(data: string) {
    this.onChoose.emit(data);
  }
}
