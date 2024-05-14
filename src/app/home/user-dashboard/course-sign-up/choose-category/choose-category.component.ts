import { Component, OnInit } from '@angular/core';
import { CourseSearchDetails } from 'src/app/forms/course-search/course-search.component';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CardDetails } from '../../../../shared/common/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css'],
})
export class ChooseCategoryComponent implements OnInit {
  categories: CategoryEnum[] = Object.values(CategoryEnum);
  courseCards: CardDetails[] = [];
  filteredCourseCard: CardDetails[] = [];

  constructor(
    public categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories.forEach((category) => {
      this.courseCards.push({
        label: category,
        info: 'Przedział cenowy: 2000zł - 4200zł',
        imagePath: this.categoryService.getCategoryImagePath(category)!,
        aspectRatio: '8/3',
        accentColor: `hsl(${this.calculateAccentColor()}, 80%, 40%)`,
        left: category === CategoryEnum.TRAMWAJ ? 70 : 75,
        height: 35,
      });
    });
    this.filteredCourseCard = this.courseCards;
  }

  private calculateAccentColor(): number {
    let hue = 20 + 10 * this.courseCards.length;
    hue = hue % 360;
    return hue;
  }

  public filter(searchDetails: CourseSearchDetails): void {
    this.filteredCourseCard = this.courseCards.filter((card) =>
      this.containsCategories(card.label!, searchDetails.categories!)
    );
  }

  private containsCategories(category: string, categories: string[]): boolean {
    return categories.length === 0 || categories.includes(category);
  }

  navigate(category: string) {
    this.router.navigate([
      '/home/dashboard/course-sign-up',
      category,
      'choose-school',
    ]);
  }
}
