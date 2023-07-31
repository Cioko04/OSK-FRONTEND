import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { School } from 'src/app/school/school';
import { SchoolService } from 'src/app/school/school.service';

@UntilDestroy()
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css'],
})
export class SchoolProfileComponent {
  initProperForm = {
    createSchool: true,
    update: true,
    createOnlySchool: true
  };

  @Input()
  school: School | any;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private schoolService: SchoolService) {}

  updateSchool(school: School) {
    this.schoolService.updateSchool(school).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e);
      },
      complete: () => {
        console.log('Updated!');
        this.eventBack.emit('submit');
      },
    });
  }
}
