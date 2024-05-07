import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-course-sign-up-card',
  templateUrl: './course-sign-up-card.component.html',
  styleUrls: ['./course-sign-up-card.component.css'],
})
export class CourseSignUpCardComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  @Input()
  type: string = '';

  @Input()
  text: string = '';

  @Input()
  imagePath: string = '';

  @Output()
  onNavigate: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    this.adjustFontSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustFontSize();
  }

  adjustFontSize() {
    if (this.container) {
      const containerWidth = this.container.nativeElement.offsetWidth;
      const fontSize = containerWidth / 25;
      const paragraph = this.container.nativeElement.querySelector(
        '#dynamicFontSize'
      ) as HTMLParagraphElement;
      paragraph.style.fontSize = `${fontSize}px`;
    }
  }
}
