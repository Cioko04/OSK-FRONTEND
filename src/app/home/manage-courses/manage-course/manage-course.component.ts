import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HeadArray } from 'src/app/shared/core/list';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCourseComponent implements OnInit {
  headArray: HeadArray[] = [
    { Head: 'Intruktor', FieldName: 'userRequest' },
    { Head: 'Data rozpoczęcia', FieldName: 'userRequest' },
    { Head: 'Data zakończenia', FieldName: 'userRequest' },
    { Head: 'Typ', FieldName: 'userRequest'},
    { Head: 'Status', FieldName: 'categories' },
  ];

  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    let email = this.auth.getSessionUserEmail();
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        let schoolId = user.schoolRequest!.id;
        this.instructorService.updateInstructorSubject(schoolId!);
      },
      error: (e: HttpErrorResponse) => console.log(e.status),
      complete: () => {
        console.log('Instructors updated!');
      },
    });
  }
}
