import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { SchoolService } from 'src/app/school/school.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  headArray = [
    { Head: 'Nazwa', FieldName: 'schoolRequest', SecondField: 'schoolName' },
    { Head: 'Właściciel', FieldName: 'name' },
    { Head: 'Miejscowość', FieldName: 'schoolRequest', SecondField: 'city' },
    {
      Head: 'Data dodania',
      FieldName: 'schoolRequest',
      SecondField: 'addDate',
    },
  ];

  initProperForm = {isFromSchool: true, update: false};

  shouldAddSchool: boolean = false;
  user: User | any;
  usersObs: Observable<User[]> = new Observable<User[]>();

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.usersObs = this.userService.getUsersWithSchool();
  }

  deleteSchool(user: User) {
    this.schoolService.deleteSchool(user.schoolRequest.id).subscribe({
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Deleted!');
        this.ngOnInit();
      },
    });
  }

  openEdit(content: any, user: User) {
    this.initProperForm.update = true;
    this.user = user;
    this.openForm(content);
  }

  onUserBack(user: User) {
    this.userService.updateUser(user).subscribe({
      error: (e: HttpErrorResponse) => {console.log(e.status), this.ngOnInit()},
      complete: () => {
        console.log('Updated!'), this.ngOnInit();
      },
    });
  }

  add(content: any) {
    // this.shouldAddSchool = true;
    // this.openForm(content);
  }

  private openForm(content: any) {
    this.modalService.open(content);
  }
}
