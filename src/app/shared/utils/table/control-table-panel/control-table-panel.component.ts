import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModificationContent } from '../table-list/table-list.component';

@Component({
  selector: 'app-control-table-panel',
  templateUrl: './control-table-panel.component.html',
  styleUrls: ['./control-table-panel.component.css', '../../utils-style.css'],
})
export class ControlTablePanelComponent implements OnInit {
  @Input()
  filter: string = '';

  @Input()
  isAction: boolean = true;

  @Output()
  onAdd = new EventEmitter<ModificationContent>();

  @Output()
  filterChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  addActiveClass(input: HTMLInputElement) {
    input.classList.add('active');
  }

  removeActiveClass(input: HTMLInputElement) {
    input.classList.remove('active');
  }

  add() {
    this.onAdd.emit();
  }

  onFilterChange() {
    this.filterChange.emit(this.filter);
  }
}
