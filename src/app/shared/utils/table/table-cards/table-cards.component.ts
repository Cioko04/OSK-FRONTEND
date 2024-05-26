import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CardDetails } from 'src/app/shared/common/card/card.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ModificationContent } from '../table-list/table-list.component';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css'],
})
export class TableCardsComponent implements OnInit, OnChanges {
  @Input()
  filter: string = '';

  @Input()
  cards: CardDetails[] = [];

  @Input()
  isAction: boolean = true;

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.cards.sort((a, b) => {
      const firstItem = a.label.toUpperCase();
      const secondItem = b.label.toUpperCase();

      if (firstItem < secondItem) {
        return -1;
      }
      if (firstItem > secondItem) {
        return 1;
      }
      return 0;
    });
  }

  getFilteredValues(): CardDetails[] {
    return this.cards.filter((item) =>
      item.label
        .toLowerCase()
        .includes(this.filter.toLowerCase())
    );
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
