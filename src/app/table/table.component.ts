import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HeadArray, InitForm } from '../shared/core/list';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  HostListener,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';
import { User } from '../shared/services/user/user';

@UntilDestroy()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  @Input()
  HeadArray: HeadArray[] = [];

  @Input()
  GridArrayObs: Observable<any[]> = new Observable<any[]>();

  @Input()
  isAction: boolean = false;

  @Input()
  categories: string[] = [];

  @Input()
  showCategoryCarousel: boolean = false;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  dataSource: any = [];
  displayedColumns: string[] = [];
  displayedInfo: string[] = [];
  expandedElement: any;
  windowWidth: number | any;

  constructor() {}

  ngOnChanges(): void {
    this.loadData();
  }

  ngOnInit(): void {
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHead(head: any): any {
    if (head.SecondField) {
      return head.SecondField;
    } else {
      return head.FieldName;
    }
  }

  adjustDisplayedColumns(length: number, showExpand: boolean) {
    this.displayedColumns = [];
    this.displayedInfo = [];
    this.displayedColumns.push('Id');
    this.HeadArray.forEach((head) => {
      this.displayedColumns.push(head.Head);
      this.displayedInfo.push(head.Head);
    });

    if (length <= 2) {
      this.displayedColumns.shift();
    }
    const countsOfColumnsToDelete = this.displayedColumns.length - length;
    if (countsOfColumnsToDelete > 0) {
      this.displayedColumns.splice(-countsOfColumnsToDelete);
    }
    if (this.isAction) {
      this.addActions();
    }

    if (showExpand) {
      this.displayedColumns.push('expand');
    }
  }

  private addActions() {
    this.displayedColumns.push('update', 'remove');
  }

  private loadData() {
    this.GridArrayObs.pipe(untilDestroyed(this)).subscribe((data) => {
      this.dataSource = this.transformData(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private transformData(data: any): MatTableDataSource<any> {
    const transformedData = data.map((item: any) => {
      const transformedItem: any = {};
      transformedItem['Id'] = data.indexOf(item) + 1;
      this.HeadArray.forEach((column) => {
        let data;
        if (column.SecondField) {
          data = item[column.FieldName][column.SecondField];
        } else {
          data = item[column.FieldName];
        }
        if (this.isArray(data)) {
          data.sort();
        }
        transformedItem[column.Head] = data;
      });
      transformedItem['sourceId'] = item.id;
      return transformedItem;
    });
    return new MatTableDataSource(transformedData);
  }

  calculateVisibleRows():number [] {
    const screenHeight = window.innerHeight * 0.65 - 152;
    const rowHeight = 48;
    let visibleRows = Math.floor(screenHeight / rowHeight);
    if(visibleRows < 3) {
      visibleRows = 3;
    }
    return [visibleRows, visibleRows*2, visibleRows*3, visibleRows*4, visibleRows*5];
  }

  add() {
    this.onAdd.emit();
  }

  edit(id: number) {
    this.GridArrayObs.pipe(
      untilDestroyed(this),
      map((data: any[]) => data.find((item) => item.id === id))
    ).subscribe((data) => this.onEdit.emit(data));
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  isArray(element: any) {
    return Array.isArray(element);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth >= 769) {
      this.adjustDisplayedColumns(this.HeadArray.length + 1, true);
    } else if (this.windowWidth <= 768 && this.windowWidth >= 635) {
      this.adjustDisplayedColumns(5, true);
    } else if (this.windowWidth <= 634 && this.windowWidth >= 577) {
      this.adjustDisplayedColumns(4, true);
    } else if (this.windowWidth <= 576 && this.windowWidth >= 481) {
      this.adjustDisplayedColumns(3, true);
    } else if (this.windowWidth <= 480 && this.windowWidth >= 371) {
      this.adjustDisplayedColumns(2, true);
    } else if (this.windowWidth <= 370 && this.windowWidth >= 321) {
      this.adjustDisplayedColumns(2, false);
    } else if (this.windowWidth <= 320) {
      this.adjustDisplayedColumns(1, false);
    }
  }

  addActiveClass(input: HTMLInputElement) {
    input.classList.add('active');
  }

  removeActiveClass(input: HTMLInputElement) {
    input.classList.remove('active');
  }
}
