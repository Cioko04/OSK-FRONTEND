import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { HeadArray } from '../../../core/list';

@UntilDestroy()
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css', '../../utils-style.css'],
})
export class CommonTableComponent implements OnChanges {
  filter: string = '';

  dataSource: any = [];

  @Input()
  useTableCards: boolean = true;

  @Input()
  isAction: boolean = true;

  @Input()
  HeadArray: HeadArray[] = [];

  @Input()
  HeadCard: HeadArray[] = [];

  @Input()
  gridArray: any[] = [];

  @Input()
  GridArrayObs: Observable<any[]> = new Observable<any[]>();

  @Input()
  showCategoryCarousel: boolean = false;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  @Output()
  onChoose = new EventEmitter<number>();

  ngOnChanges(): void {
    this.loadData();
  }

  add() {
    this.onAdd.emit();
  }

  edit(data: any) {
    this.onEdit.emit(data);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }

  addActiveClass(input: HTMLInputElement) {
    input.classList.add('active');
  }

  removeActiveClass(input: HTMLInputElement) {
    input.classList.remove('active');
  }

  private loadData() {
    this.dataSource = this.transformData(this.gridArray);
  }

  private transformData(data: any): any {
    return data.map((item: any) => {
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
  }

  private isArray(element: any) {
    return Array.isArray(element);
  }
}
