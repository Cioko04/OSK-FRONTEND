import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { HeadArray } from 'src/app/shared/core/BaseEntityComponent';
import { CategoryEnum } from 'src/app/shared/services/category/category';
import { School } from 'src/app/shared/services/school/school';
import { SchoolService } from 'src/app/shared/services/school/school.service';

@UntilDestroy()
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  headArray: HeadArray[] = [
    { head: 'Nazwa', fieldName: 'schoolName' },
    { head: 'Miasto', fieldName: 'city' },
    { head: 'Kategorie', fieldName: 'categories' },
  ];

  headCard: HeadArray[] = [
    { head: 'Kategoria', fieldName: 'category' },
    { head: 'Cena', fieldName: 'price' },
    { head: 'Opis', fieldName: 'description' },
  ];

  form: FormGroup | any;
  chosenCategories: string[] = [];
  schools: School[] = [];
  categories: string[] = [];
  cities$!: Observable<string[]>;

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
   
    this.categories = Object.values(CategoryEnum);
    this.form = this.formBuilder.group({
      cities: [[]],
      categories: [[]],
    });
  }

  ngOnInit(): void {
    this.cities$ = this.schoolService.getCities();
    this.schoolService
      .getSchoolsWithCategories()
      .pipe(untilDestroyed(this))
      .subscribe((schools) => (this.schools = schools));

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
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
    this.schools = this.schools.filter((schools) => this.containsCategories(schools.categories!) && this.containsCities(schools.city));
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
