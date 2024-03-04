import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeadArray } from '../../core/list';
import { CategoryService } from '../../services/category/category.service';
import { CourseService } from '../../services/course/course.service';

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
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor(
    public categoryService: CategoryService
  ) {}

  showDetails(): void {
    this.edit
      ? this.onEdit.emit(this.category)
      : (this.isDetailsVisible = !this.isDetailsVisible);
  }

  choose(id: number) {
    this.onChoose.emit(id);
  }
}
