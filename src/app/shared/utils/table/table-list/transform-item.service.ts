import { Injectable } from '@angular/core';
import { HeadArray } from '../../../core/list';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class TransformItemService {

constructor() { }

public transformData(data: any, headArray: HeadArray[]): MatTableDataSource<any> {
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
}
