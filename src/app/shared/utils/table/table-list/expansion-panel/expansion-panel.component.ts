import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { ModificationContent } from '../table-list.component';

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
  update: boolean;
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
  onAdd = new EventEmitter<ModificationContent>();

  @Output()
  onDelete = new EventEmitter<ModificationContent>();

  @Output()
  onEdit = new EventEmitter<ModificationContent>();

  constructor() {}

  ngOnInit() {}

  remove(content: ModificationContent) {
    this.onDelete.emit(content);
  }

  add(content: ModificationContent) {
    this.onAdd.emit(content);
  }

  edit(content: ModificationContent) {
    this.onEdit.emit(content);
  }
}
