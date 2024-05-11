import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadArray } from '../../core/BaseEntityComponent';
import { CategoryService } from '../../services/category/category.service';
import { ModificationContent } from '../../utils/table/table-list/table-list.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isDetailsVisible = false;

  @Input()
  category!: any;

  @Input()
  HeadArray: HeadArray[] = [];

  @Input()
  edit: boolean = true;

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor(
    public categoryService: CategoryService
  ) {}

  showDetails(): void {
    this.edit
      ? this.onEdit.emit({id:this.category.id})
      : (this.isDetailsVisible = !this.isDetailsVisible);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
