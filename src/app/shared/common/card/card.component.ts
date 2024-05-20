import {
  Component,
  ElementRef,
  EventEmitter,
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
  height: number;
  left: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  @Input()
  cardDetails!: CardDetails;

  @Output()
  onChoose = new EventEmitter<number>();

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  constructor() {}

  edit(id: number): void {
    this.onEdit.emit({ id: id });
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
