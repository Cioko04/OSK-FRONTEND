import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize: any;
  items: any = [];

  @Input()
  HeadArray: any[] = [];

  @Input()
  GridArray: any[] = [];

  @Input()
  isAction: boolean = false;

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.collectionSize = this.GridArray.length;
    this.refresh();
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  delete(item: any) {
    this.onEdit.emit(item);
  }

  refresh() {
    this.items = this.GridArray
      .map((item, i) => ({ ids: i+ 1, ...item }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      console.log(this.items);
  }
}
