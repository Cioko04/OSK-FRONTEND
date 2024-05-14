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
import { ModificationContent } from '../../utils/table/table-list/table-list.component';

export interface CardDetails {
  sourceId?: number;
  label?: string;
  info?: string;
  imagePath?: string;
  route?: string;
  aspectRatio: string;
  accentColor: string;
  showActionButton?: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  @Input()
  cardDetails!: CardDetails;

  @Output()
  onChoose = new EventEmitter<number>();

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

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

  edit(id: number): void {
    this.onEdit.emit({ id: id });
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
