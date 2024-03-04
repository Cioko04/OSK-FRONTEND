import { Injectable } from '@angular/core';
import { CATEGORY_IMAGES, CategoryEnum } from './category';

const CATEGORY_IMAGE_PATH = '../../../../assets/category-icons/';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategoryImagePath(categoryType: CategoryEnum): string | undefined {
    return CATEGORY_IMAGE_PATH + CATEGORY_IMAGES.find(
      (category) => category.category === categoryType
    )?.path;
  }
}
