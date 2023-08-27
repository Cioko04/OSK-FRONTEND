export interface Course {
  id?: number;
  price: number;
  description: string;
  schoolId?: number;
  categoryType: string;
}

export enum CategoryEnum {
  AM = 'AM',
  A1 = 'A1',
  A2 = 'A2',
  A = 'A',
  B2 = 'B2',
  B = 'B',
  BE = 'B+E',
  C = 'C',
  C1 = 'C1',
  C1E = 'C1+E',
  CE = 'C+E',
  D = 'D',
  D1 = 'D1',
  D1E = 'D1+E',
  DE = 'D+E',
  T = 'T',
  Tramwaj = 'Tramwaj'
}
