import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { School } from 'src/app/school/school';
import { SchoolService } from 'src/app/school/school.service';
import { CategoryEnum } from 'src/app/shared/enums/CategoryEnum';
import { HeadArray } from 'src/app/shared/interfaces/list';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  headArray: HeadArray[] = [
    { Head: 'Nazwa', FieldName: 'schoolName' },
    { Head: 'Miasto', FieldName: 'city' },
    { Head: 'Kategorie', FieldName: 'categories' },
  ];

  form: FormGroup | any;

  schoolObs: Observable<School[]> = new Observable<School[]>();

  cities: string[] = [];
  citiesObs: Observable<string[]> | any;
  categories: string[] = [];
  categoriesObs: Observable<string[]> | any;


  constructor(private schoolService: SchoolService, private formBuilder: FormBuilder) {
    this.citiesObs = this.schoolService.getCities();
    this.categoriesObs = of(Object.values(CategoryEnum));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cities: [],
      categories: [],
    });
    this.search();
  }

  addCitesToSearch(event: string[]) {
    this.cities = event;
    this.search();
  }

  addCategoriesToSearch(event: string[]) {
    this.categories = event;
    this.search();
  }

  private search() {
    this.schoolObs = this.schoolService.getSchoolByCitiesAndCategories(
      this.cities,
      this.categories
    );
  }
}
