import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ResizeTextDirective } from '../directive/resize-text.directive';
import { NewlineToBrPipe } from '../pipe/newline-to-br.pipe';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OskSpinnerComponent } from './osk-spinner/osk-spinner.component';

@NgModule({
  imports: [
    NgbCarouselModule,
    AngularCommon,
    MatExpansionModule,
    MatIconModule,
  ],
  declarations: [
    CarouselComponent,
    CardComponent,
    ResizeTextDirective,
    NewlineToBrPipe,
    OskSpinnerComponent,
  ],
  exports: [CarouselComponent, CardComponent, OskSpinnerComponent],
})
export class CommonModule {}
