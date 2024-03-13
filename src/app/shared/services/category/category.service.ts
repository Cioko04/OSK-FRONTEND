import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CATEGORY_IMAGES, CategoryEnum } from './category';

const CATEGORY_IMAGE_PATH = '../../../../assets/category-icons/';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<string[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() {}

  loadCategories(categories: CategoryEnum[]) {
    this.categoriesSubject.next(categories);
  }

  getCategoryImagePath(categoryType: CategoryEnum): string | undefined {
    return (
      CATEGORY_IMAGE_PATH +
      CATEGORY_IMAGES.find((category) => category.category === categoryType)
        ?.path
    );
  }
}
