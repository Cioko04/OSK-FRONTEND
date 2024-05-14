import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule as AngularCommon } from '@angular/common';

@NgModule({
  imports: [NgbCarouselModule, AngularCommon],
  declarations: [CarouselComponent, CardComponent],
  exports: [CarouselComponent, CardComponent]
})
export class CommonModule {}
