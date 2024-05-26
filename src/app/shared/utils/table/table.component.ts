import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { HeadArray } from '../../core/BaseEntityComponent';
import { ModificationContent } from './table-list/table-list.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css', '../utils-style.css'],
})
export class TableComponent implements OnInit{
  filter: string = '';

  @Input()
  useTableCards: boolean = true;

  @Input()
  isAction: boolean = true;

  @Input()
  headArray: HeadArray[] = [];

  @Input()
  gridArray: any[] = [];

  @Input()
  showCategoryCarousel: boolean = false;

  @Input()
  showControlPanel: boolean = true;

  @Output()
  onAdd = new EventEmitter<ModificationContent>();

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  @Output()
  onDelete = new EventEmitter<ModificationContent>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
  }

  add(content: ModificationContent) {
    this.onAdd.emit(content);
  }

  edit(content: ModificationContent) {
    this.onEdit.emit(content);
  }

  delete(content: ModificationContent) {
    this.onDelete.emit(content);
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
}
