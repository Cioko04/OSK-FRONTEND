
import { NgModule } from '@angular/core';
import { NgTemplateNameDirective } from './ng-template-name.directive';
import { ResizeTextDirective } from './resize-text.directive';

@NgModule({
  imports: [],
  declarations: [NgTemplateNameDirective, ResizeTextDirective],
  exports: [NgTemplateNameDirective, ResizeTextDirective],
})
export class OskDirectiveModule {}
