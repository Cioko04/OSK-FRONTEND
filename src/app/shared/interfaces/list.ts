export interface List {
  headArray: HeadArray[];

  onDelete(id: number): void;

  onAdd(content: any): void;

  onEdit(content: any, item: any): void;

  onSubmit(): void;

  update(): void;

  add(): void;

  openForm(content: any): void;
}

export interface HeadArray {
  Head: string;
  FieldName: string;
  SecondField?: string;
};
