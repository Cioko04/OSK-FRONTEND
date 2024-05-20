import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ResizeTextDirective } from '../directive/resize-text.directive';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewlineToBrPipe } from '../pipe/newline-to-br.pipe';
import { OskSpinnerComponent } from './osk-spinner/osk-spinner.component';

@NgModule({
  imports: [NgbCarouselModule, AngularCommon],
  declarations: [CarouselComponent, CardComponent, ResizeTextDirective, NewlineToBrPipe, OskSpinnerComponent],
  exports: [CarouselComponent, CardComponent, OskSpinnerComponent],
})
export class CommonModule {}
