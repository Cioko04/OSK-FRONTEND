import { Component, OnInit } from '@angular/core';
import { HeadArray } from 'src/app/shared/core/BaseEntityComponent';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CardDetails } from '../../../../shared/common/card/card.component';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css'],
})
export class ChooseCategoryComponent implements OnInit {
  headArray: HeadArray[] = [
    { Head: 'Kategoria', FieldName: 'categoryType' },
    { Head: 'Cena', FieldName: 'price' },
  ];

  categories: CategoryEnum[] = Object.values(CategoryEnum);

  courseCards: CardDetails[] = [];

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categories.forEach((category) => {
      this.courseCards.push({
        label: category,
        info: 'Przedział cenowy: 2000zł - 4200zł',
        imagePath: this.categoryService.getCategoryImagePath(category)!,
        aspectRatio: '8/3',
        accentColor: `hsl(${this.calculateAccentColor()}, 80%, 40%)`
      });
    });
  }

  private calculateAccentColor() {
    let hue = 20 + 10 * this.courseCards.length;
    hue = hue % 360;
    return hue;
  }
}
