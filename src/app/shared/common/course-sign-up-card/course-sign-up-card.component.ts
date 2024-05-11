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

export interface CardDetails {
  label?: string;
  info?: string;
  imagePath?: string;
  route?: string;
  aspectRatio: string;
  accentColor: string;
  showActionButton?: boolean;
}

@Component({
  selector: 'app-course-sign-up-card',
  templateUrl: './course-sign-up-card.component.html',
  styleUrls: ['./course-sign-up-card.component.css'],
})
export class CourseSignUpCardComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  @Input()
  cardDetails!: CardDetails;

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
      const paragraphs = this.container.nativeElement.querySelectorAll(
        '#dynamicFontSize'
      ) as NodeListOf<HTMLParagraphElement>;
      paragraphs.forEach((paragraph) => {
        paragraph.style.fontSize = `${fontSize}px`;
      });
    }
  }
}
