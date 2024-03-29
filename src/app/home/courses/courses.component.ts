import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { School } from 'src/app/shared/services/school/school';
import { SchoolService } from 'src/app/shared/services/school/school.service';
import { HeadArray } from 'src/app/shared/core/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryEnum } from 'src/app/shared/services/category/category';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  headArray: HeadArray[] = [
    { Head: 'Nazwa', FieldName: 'schoolName' },
    { Head: 'Miasto', FieldName: 'city' },
    { Head: 'Kategorie', FieldName: 'categories' }
  ];

  headCard: HeadArray[] = [
    { Head: 'Kategoria', FieldName: 'category' },
    { Head: 'Cena', FieldName: 'price' },
    { Head: 'Opis', FieldName: 'description' }
  ];

  form: FormGroup | any;
  chosenCategories: string[] = [];

  schoolObs: Observable<School[]> = new Observable<School[]>();
  categoriesObs: Observable<string[]> = new Observable<string[]>();
  citiesObs: Observable<string[]> = new Observable<string[]>();

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.citiesObs = this.schoolService.getCities();
    this.categoriesObs = of(Object.values(CategoryEnum));
    this.form = this.formBuilder.group({
      cities: [[]],
      categories: [[]],
    });
  }

  ngOnInit(): void {
    this.schoolObs = this.schoolService.getSchoolsWithCategories();
    this.form.valueChanges.subscribe(() => {
      this.search();
      this.chosenCategories = this.form.value.categories;
    });
  }

  book(content: any) {
    this.openForm(content);
  }

  openForm(content: any): void {
    this.modalService.open(content);
  }

  private search() {
    this.schoolObs = this.schoolObs.pipe(
      map((school) =>
        school.filter(
          (item) =>
            this.containsCategories(item.categories!) &&
            this.containsCities(item.city)
        )
      )
    );
  }

  private containsCities(city: string): boolean {
    return (
      this.form.value.cities.length === 0 ||
      this.form.value.cities.includes(city)
    );
  }

  private containsCategories(categories: string[]) {
    return (
      this.form.value.categories.length === 0 ||
      this.form.value.categories.some((category: string) =>
        categories.includes(category)
      )
    );
  }
}
