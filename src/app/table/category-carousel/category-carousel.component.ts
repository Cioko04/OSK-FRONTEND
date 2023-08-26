import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.css'],
})
export class CategoryCarouselComponent {
  @Input()
  categories: string[] = [];

  startX: number | undefined;
  isMoved = false;

  @ViewChild('carousel') carousel: NgbCarousel | any;

  constructor(private config: NgbCarouselConfig) {
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;
    this.config.pauseOnFocus = true;
    this.config.pauseOnHover = true;
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.carousel.pause();
  }

  onTouchMove(event: TouchEvent) {
    if (this.startX !== undefined && !this.isMoved) {
      const deltaX = event.touches[0].clientX - this.startX;
      if (deltaX > 0) {
        this.carousel.prev();
        this.isMoved = true;
      } else {
        this.carousel.next();
        this.isMoved = true;
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.startX = undefined;
    this.isMoved = false;
    setTimeout(() => {
      this.carousel.cycle();
    }, 5000);
  }
}
