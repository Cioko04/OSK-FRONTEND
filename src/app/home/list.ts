export declare interface List {
  onDelete(id: number): void;

  onAdd(content: any): void;

  onEdit(content: any, item: any): void;

  onSubmit(): void;

  update(): void;

  add(): void;

  openForm(content: any): void;
}
