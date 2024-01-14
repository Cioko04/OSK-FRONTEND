export enum CategoryEnum {
  AM = 'AM',
  A1 = 'A1',
  A2 = 'A2',
  A = 'A',
  B1 = 'B1',
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
  TRAMWAJ = 'Tramwaj'
}

export interface CategoryImages {
  category: CategoryEnum;
  path: string;
}

export const CATEGORY_IMAGES: CategoryImages[] = [
  {
    category: CategoryEnum.AM,
    path: 'AM.png'
  },
  {
    category: CategoryEnum.A1,
    path: 'A.png'
  },
  {
    category: CategoryEnum.A2,
    path: 'A.png'
  },
  {
    category: CategoryEnum.A,
    path: 'A.png'
  },
  {
    category: CategoryEnum.B1,
    path: 'B1.png'
  },
  {
    category: CategoryEnum.B,
    path: 'B.png'
  },
  {
    category: CategoryEnum.BE,
    path: 'BE.png'
  },
  {
    category: CategoryEnum.C,
    path: 'C.png'
  },
  {
    category: CategoryEnum.C1,
    path: 'C1.png'
  },
  {
    category: CategoryEnum.C1E,
    path: 'C1E.png'
  },
  {
    category: CategoryEnum.CE,
    path: 'CE.png'
  },
  {
    category: CategoryEnum.D,
    path: 'D.png'
  },
  {
    category: CategoryEnum.D1,
    path: 'D1.png'
  },
  {
    category: CategoryEnum.D1E,
    path: 'D1E.png'
  },
  {
    category: CategoryEnum.DE,
    path: 'DE.png'
  },
  {
    category: CategoryEnum.T,
    path: 'T.png'
  },
  {
    category: CategoryEnum.TRAMWAJ,
    path: 'Tramwaj.png'
  }
];
