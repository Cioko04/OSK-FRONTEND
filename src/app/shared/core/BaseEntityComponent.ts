import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContent } from '../utils/table/table-interfaces/add-content';
import { DeleteContent } from '../utils/table/table-interfaces/delete-content';

export abstract class BaseEntityComponent {
  headArray: HeadArray[] = [];

  constructor(public modalService: NgbModal) {}

  abstract onDeleteEntity(deleteContent: DeleteContent): void;

  abstract onFormSubmit(): void;

  abstract onUpdateEntity(): void;

  abstract onAddEntity(): void;

  onOpenAddForm(content: any): void;
  onOpenAddForm(content: any, addContent: AddContent): void;

  onOpenAddForm(content: any, addContent?: AddContent): void {
    this.openForm(content);
  }

  onOpenEditForm(content: any, item: any): void {
    this.openForm(content);
  }

  openForm(content: any): void {
    this.modalService.open(content);
  }
}

export interface HeadArray {
  Head: string;
  FieldName: string;
  SecondField?: string;
}
