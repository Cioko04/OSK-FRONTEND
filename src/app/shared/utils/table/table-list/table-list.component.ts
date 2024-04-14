import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntilDestroy } from '@ngneat/until-destroy';
import { HeadArray } from '../../../core/BaseEntityComponent';
import { TransformItemService } from './transform-item.service';
import { FormType } from 'src/app/forms/core/data-types/FormType';

@UntilDestroy()
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css', '../../utils-style.css'],
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
export class TableListComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input()
  headArray: HeadArray[] = [];

  @Input()
  gridArray: any[] = [];

  @Input()
  isAction: boolean = false;

  @Input()
  categories: string[] = [];

  @Input()
  showCategoryCarousel: boolean = false;

  @Input()
  filter: string = '';

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<{id: number, formType: FormType | undefined}>();

  @Output()
  onBook = new EventEmitter<number>();

  @Output()
  formType = new EventEmitter<FormType>();

  dataSource: any = [];
  displayedColumns: string[] = [];
  displayedInfo: string[] = [];
  expandedElement: any;
  windowWidth: number | any;

  constructor(private transformItemService: TransformItemService) {}

  ngOnInit(): void {
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }

  ngOnChanges(): void {
    this.loadData();
  }

  getHead(head: any): any {
    if (head.SecondField) {
      return head.SecondField;
    } else {
      return head.FieldName;
    }
  }

  private adjustColumns(length: number, showExpand: boolean) {
    this.displayedColumns = [];
    this.displayedInfo = [];
    this.headArray.forEach((head) => {
      this.displayedColumns.push(head.Head);
      this.displayedInfo.push(head.Head);
    });
    this.displayedColumns = this.transformItemService.adjustDisplayedColumns(
      this.displayedColumns,
      length,
      showExpand,
      this.isAction
    );
  }

  private loadData() {
    if (this.gridArray) {
      this.dataSource = this.transformItemService.transformData(
        this.gridArray,
        this.headArray
      );
      this.applyFilter();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  calculateVisibleRows(): number[] {
    const screenHeight = window.innerHeight * 0.65 - 152;
    const rowHeight = 48;
    let visibleRows = Math.floor(screenHeight / rowHeight);
    if (visibleRows < 3) {
      visibleRows = 3;
    }
    return [
      visibleRows,
      visibleRows * 2,
      visibleRows * 3,
      visibleRows * 4,
      visibleRows * 5,
    ];
  }

  add(formType: FormType, sourceId: number) {
    this.onAdd.emit({formType, sourceId});
  }

  edit(id: number) {
    const item = this.gridArray.find((item) => item.id === id);
    this.onEdit.emit(item);
  }

  delete(event: {id: number, formType: FormType | undefined}) {
    this.onDelete.emit(event);
  }

  book() {
    this.onBook.emit();
  }

  emitFormType(formType: FormType) {
    this.formType.emit(formType);
  }

  isArray(element: any) {
    return Array.isArray(element);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth >= 769) {
      this.adjustColumns(this.headArray.length + 1, true);
    } else if (this.windowWidth <= 768 && this.windowWidth >= 635) {
      this.adjustColumns(5, true);
    } else if (this.windowWidth <= 634 && this.windowWidth >= 577) {
      this.adjustColumns(4, true);
    } else if (this.windowWidth <= 576 && this.windowWidth >= 481) {
      this.adjustColumns(3, true);
    } else if (this.windowWidth <= 480 && this.windowWidth >= 371) {
      this.adjustColumns(2, true);
    } else if (this.windowWidth <= 370 && this.windowWidth >= 321) {
      this.adjustColumns(2, false);
    } else if (this.windowWidth <= 320) {
      this.adjustColumns(1, false);
    }
  }
}
