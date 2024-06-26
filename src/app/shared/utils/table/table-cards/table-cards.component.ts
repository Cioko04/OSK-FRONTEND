import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { HeadArray } from 'src/app/shared/core/BaseEntityComponent';
import { ModificationContent } from '../table-list/table-list.component';
import { CardDetails } from 'src/app/shared/common/card/card.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css'],
})
export class TableCardsComponent implements OnInit, OnChanges {
  @Input()
  filter: string = '';

  @Input()
  headArray: HeadArray[] = [];

  @Input()
  gridArray: any[] = [];

  @Input()
  isAction: boolean = true;

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.gridArray.sort((a, b) => {
      const firstItem = a[this.headArray[0].fieldName].toUpperCase();
      const secondItem = b[this.headArray[0].fieldName].toUpperCase();

      if (firstItem < secondItem) {
        return -1;
      }
      if (firstItem > secondItem) {
        return 1;
      }
      return 0;
    });
  }

  getFilteredValues(): any[] {
    return this.gridArray.filter((item) =>
      item[this.headArray[0].fieldName]
        .toLowerCase()
        .includes(this.filter.toLowerCase())
    );
  }

  getCardDetails(item: any): CardDetails {
    return {
      sourceId: item.id,
      label: `${this.headArray[0].head}  ${item[this.headArray[0].fieldName]}`,
      imagePath: this.categoryService.getCategoryImagePath(
        item[this.headArray[0].fieldName]
      ),
      showActionButton: true,
      aspectRatio: '8/3',
      accentColor: 'hsl(214, 80%, 40%)',
      left: 60,
      height: 30,
    };
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
