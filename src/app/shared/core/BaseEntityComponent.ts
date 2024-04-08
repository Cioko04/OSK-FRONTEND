import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormType } from 'src/app/forms/core/data-types/FormType';

export abstract class BaseEntityComponent {
  headArray: HeadArray[] = [];

  constructor(public modalService: NgbModal) {}

  abstract onDelete(id: number, formType: FormType): void;

  abstract onSubmit(): void;

  abstract update(): void;

  abstract add(): void;

  onAdd(content: any): void {
    this.openForm(content);
  }

  onEdit(content: any, item: any): void {
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
