import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { HeadArray } from 'src/app/shared/core/list';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css'],
})
export class TableCardsComponent implements OnInit, OnChanges {
  @Input()
  filter: string = '';

  @Input()
  HeadArray: HeadArray[] = [];

  @Input()
  gridArray: any[] = [];

  @Input()
  isAction: boolean = true;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  @Output()
  onChoose = new EventEmitter<number>();

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.gridArray.sort((a, b) => {
      const kategoriaA = a[this.HeadArray[0].FieldName].toUpperCase();
      const kategoriaB = b[this.HeadArray[0].FieldName].toUpperCase();

      if (kategoriaA < kategoriaB) {
        return -1;
      }
      if (kategoriaA > kategoriaB) {
        return 1;
      }
      return 0;
    });
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
