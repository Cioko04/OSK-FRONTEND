import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { School } from './../../../school/school';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SchoolService } from 'src/app/school/school.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  schools: Array<School> = [];

  school: School = {};
  shouldAddSchool: boolean = true;

  constructor(private modalService: NgbModal, private schoolService: SchoolService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.schoolService.getSchools().subscribe({
      next: (schools) => this.schools.push(...schools),
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => console.log(this.schools),
    });

  }

  deleteSchool(school: School) {
    this.schools = this.schools.filter((element) => element !== school);
  }

  editAddSchool(content: any, school: School, shouldAddSchool: boolean) {
    this.school = school;
    this.shouldAddSchool = shouldAddSchool;
    this.modalService.open(content, {size: 'lg'}).result.then(
      (result) => {
        if(this.shouldAddSchool) {
          this.addSchool();
        }
        this.school = {};
      },
      (reason) => {
        this.school = {};
      }
    );
  }

  private addSchool() {
    if (Object.values(this.school).filter(value => typeof value === 'undefined').length == 0){
      this.schools.push(this.school);
      // this.auth.register(this.school);
    };
  }
}
