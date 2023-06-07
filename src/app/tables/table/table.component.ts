import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  page = 1;
  pageSize = 4;
  collectionSize: any;
  items: any = [];

  @Input()
  HeadArray: any[] = [];

  @Input()
  GridArrayObs: Observable<any[]> = new Observable<any[]>();

  @Input()
  isAction: boolean = false;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.GridArrayObs.subscribe((data) => {
      this.collectionSize = data.length;
      this.refresh(data);
    });
  }

  add() {
    this.onAdd.emit();
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  refresh(data: any[]) {
    this.items = data
      .map((item: any, i: number) => ({
        ids: i + 1,
        ...item,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
