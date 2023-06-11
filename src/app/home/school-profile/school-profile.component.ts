import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { School } from 'src/app/school/school';

@UntilDestroy()
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css'],
})
export class SchoolProfileComponent implements OnInit {
  initProperForm = { isFromSchool: true, update: true, showOnlySchool: true , showCategories: true};

  @Input()
  school: School | any;

  @Output()
  eventBack = new EventEmitter<string>();

  ngOnInit() {
  }

  constructor() {
  }

  updateSchool(school: School) {
    console.log(school);
  }
}
