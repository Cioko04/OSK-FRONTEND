import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormType } from 'src/app/forms/core/data-types/FormType';

export abstract class BaseEntityComponent {
  headArray: HeadArray[] = [];

  constructor(public modalService: NgbModal) {}

  abstract onDeleteEntity(id: number, formType: FormType): void;

  abstract onFormSubmit(): void;

  abstract onUpdateEntity(): void;

  abstract onAddEntity(): void;

  onOpenAddForm(content: any): void {
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
