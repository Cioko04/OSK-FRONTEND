import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { HeadArray } from '../../core/BaseEntityComponent';
import { FormType } from 'src/app/forms/core/data-types/FormType';

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

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onEdit = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<number>();

  @Output()
  onChoose = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
  }

  add(formType: FormType) {
    this.onAdd.emit(formType);
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
}
