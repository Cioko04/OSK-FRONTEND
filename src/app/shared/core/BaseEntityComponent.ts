import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export abstract class BaseEntityComponent {
  headArray: HeadArray[] | any;

  initProperForm: InitForm = {
    school: false,
    instructor: false,
    user: false,
    update: false,
  };

  constructor(public modalService: NgbModal) {}

  abstract onDelete(id: number): void;

  abstract onSubmit(item: any): void;

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

export interface InitForm {
  school: boolean;
  instructor: boolean;
  user: boolean;
  update: boolean;
}


