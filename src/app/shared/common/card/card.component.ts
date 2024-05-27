import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ModificationContent } from '../../utils/table/table-list/table-list.component';
import { NgTemplateNameDirective } from '../../directive/ng-template-name.directive';

export interface CardDetails {
  sourceId: number;
  label: string;
  info?: string;
  imagePath?: string;
  aspectRatio: string;
  accentColor: string;
  showActionButton?: boolean;
  showDetails?: boolean;
  extensionDetails?: string[];
  height?: number;
}

enum CardTemplatesContent {
  MAIN_ROW = 'mainRow',
  ACTION_BUTTONS = 'actionButtons',
  DETAILS = 'details',
  INFO = 'info',
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  panelOpenState: boolean = false;
  templatesToRender: TemplateRef<any>[] = [];

  @Input()
  cardDetails!: CardDetails;

  @Output()
  onChoose = new EventEmitter<number>();

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  constructor() {}

  public edit(id: number): void {
    this.onEdit.emit({ id: id });
  }

  public choose(id: number) {
    this.onChoose.emit(id);
  }
}
