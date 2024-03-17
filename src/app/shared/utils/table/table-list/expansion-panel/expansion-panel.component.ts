import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormType } from 'src/app/forms/core/data-types/FormType';

export interface ExpansionPanelDetail {
  icon: string;
  titile: string;
  description: string;
  buttonText: string;
  formType: FormType;
  entities: ExpansionPanelEntity[];
}

export interface ExpansionPanelEntity {
  id: number;
  displayContent: string;
}

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css', '../table-list.component.css'],
})
export class ExpansionPanelComponent implements OnInit {
  @Input()
  expansionPanelDetails: ExpansionPanelDetail[] = [];

  @Output()
  onAdd = new EventEmitter<FormType>();

  @Output()
  onDelete = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  remove(id: number) {
    this.onDelete.emit(id);
  }

  add(formType: FormType) {
    this.onAdd.emit(formType);
  }
}
