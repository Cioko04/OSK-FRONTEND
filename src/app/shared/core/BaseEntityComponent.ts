import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificationContent } from '../utils/table/table-list/table-list.component';

export abstract class BaseEntityComponent {
  headArray: HeadArray[] = [];

  constructor(public modalService: NgbModal) {}

  abstract onDeleteEntity(deleteContent: ModificationContent): void;

  abstract onFormSubmit(): void;

  abstract onUpdateEntity(): void;

  abstract onAddEntity(): void;

  onOpenAddForm(content: any, addContent?: ModificationContent): void {
    this.openForm(content);
  }

  onOpenEditForm(content: any, item?: any): void {
    this.openForm(content);
  }

  openForm(content: any): void {
    this.modalService.open(content);
  }
}

export interface HeadArray {
  head: string;
  fieldName: string;
  secondField?: string;
}
