import { Injectable } from "@angular/core";
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from "@angular/material/legacy-paginator";

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementów na stronie:';
  override nextPageLabel = 'Następna strona';
  override previousPageLabel = 'Poprzednia strona';
  override firstPageLabel = 'Pierwsza strona';
  override lastPageLabel = 'Ostatnia strona';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} z ${length}`;
  };
}
