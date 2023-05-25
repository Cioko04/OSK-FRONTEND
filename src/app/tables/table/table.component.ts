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
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<any>();

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

  edit(item: any) {
    this.onEdit.emit(item);
  }

  delete(item: any) {
    this.onDelete.emit(item);
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
