import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { SchoolService } from 'src/app/school/school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit {
  $users: Array<User> = [];

  page = 1;
  pageSize = 4;
  collectionSize: any;
  users: User[] | any;

  user: User | any;
  shouldAddSchool: boolean = true;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersWithSchool().subscribe({
      next: (users) => {
        this.$users = [];
        this.$users.push(...users);
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        this.collectionSize = this.$users.length;
        this.refreshUsers();
      },
    });
  }

  refreshUsers() {
    this.users = this.$users
      .map((user, i) => ({ ids: i+ 1, ...user }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  deleteSchool(id: number) {
    this.schoolService.deleteSchool(id);
    this.$users = this.$users.filter((element) => element.schoolRequest.id !== id);
    this.refreshUsers();
  }

  edit(content: any, user: User) {
    this.shouldAddSchool = false;
    this.user = user;
    this.openForm(content);
  }

  add(content: any) {
    this.shouldAddSchool = true;
    this.openForm(content);
  }

  private openForm(content: any) {
    this.modalService.open(content).result.then(async () => {
      console.log('start');
      setTimeout(() => {
        this.ngOnInit();
      }, 1000);
    });
  }
}
