import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormSettings } from 'src/app/forms/core/data-types/FormSettings';
import { FormType } from 'src/app/forms/core/data-types/FormType';
import { HeadArray, BaseEntityComponent } from 'src/app/shared/core/BaseEntityComponent';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCourseComponent extends BaseEntityComponent implements OnInit {
  override headArray: HeadArray[] = [
    { Head: 'Intruktor', FieldName: 'userRequest' },
    { Head: 'Data rozpoczęcia', FieldName: 'userRequest' },
    { Head: 'Data zakończenia', FieldName: 'userRequest' },
    { Head: 'Typ', FieldName: 'userRequest'},
    { Head: 'Status', FieldName: 'categories' },
  ];

  formSettings: FormSettings = {
    formType: FormType.SCHEDULE,
    buttonText: "Zapisz",
    edit: false
  }

  schedule!: Schedule;

  constructor(
    modalService: NgbModal,
    private auth: AuthenticationService,
    private userService: UserService,
    private instructorService: InstructorService
  ) {
    super(modalService);
  }

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

  override onDelete(id: number): void {
    throw new Error('Method not implemented.');
  }
  override onSubmit(item: any): void {
    throw new Error('Method not implemented.');
  }
  override update(): void {
    throw new Error('Method not implemented.');
  }
  override add(): void {
    throw new Error('Method not implemented.');
  }

  addScheduleWithStartDate(content: any, date: any) {
    this.schedule = {
      startDate: date
    }
    this.formSettings.edit = false;
    super.onAdd(content);
  }

  addEmptySchedule(content: any) {
    this.schedule = {
      startDate: new Date()
    }
    this.formSettings.edit = false;
    super.onAdd(content);
  }

  editSchedule(content: any, schedule: Schedule) {
    this.schedule = schedule;
    this.formSettings.edit = true;
    super.onEdit(content, schedule);
  }
}
