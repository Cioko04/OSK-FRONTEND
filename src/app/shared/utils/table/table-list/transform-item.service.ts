import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeadArray } from '../../../core/BaseEntityComponent';

@Injectable({
  providedIn: 'root',
})
export class TransformItemService {
  constructor() {}

  public transformData(
    data: any,
    headArray: HeadArray[]
  ): MatTableDataSource<any> {
    const transformedData = data.map((item: any) => {
      const transformedItem: any = {};
      headArray.forEach((column) => {
        let data;
        if (column.SecondField) {
          data = item[column.FieldName][column.SecondField];
        } else {
          data = item[column.FieldName];
        }
        if (Array.isArray(data)) {
          data.sort();
        }
        transformedItem[column.Head] = data;
      });
      transformedItem['sourceId'] = item.id;
      return transformedItem;
    });
    return new MatTableDataSource(transformedData);
  }

  public adjustDisplayedColumns(
    displayedColumns: string[],
    length: number,
    showExpand: boolean,
    isAction: boolean
  ): string[] {
    if (length <= 2) {
      displayedColumns.shift();
    }
    const countsOfColumnsToDelete = displayedColumns.length - length;
    if (countsOfColumnsToDelete > 0) {
      displayedColumns.splice(-countsOfColumnsToDelete);
    }
    if (isAction) {
      displayedColumns.push('update', 'remove');
    }

    if (showExpand) {
      displayedColumns.push('expand');
    }
    return displayedColumns;
  }
}
