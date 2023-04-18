import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { School } from 'src/app/school/school';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSchoolComponent implements OnChanges {
  @Input() schoolsToEdit: School[] = [{}];
  editedSchools: School[] = [{}];

  page = 1;
  pageSize = 1;
  collectionSize: any;
  schools: School[] | any;
  schoolForm = this.fb.group({
    name: [''],
    owner: [''],
    city: [''],
    zipCode: [''],
    nip: [''],
    date: [''],
  });
  school: School | any;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.collectionSize = this.schoolsToEdit.length;
    this.refreshSchools();
  }

  refreshSchools() {
    this.schools = this.schoolsToEdit
      .map((school, i) => ({
        id: i + 1,
        ...school,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.getSchoolForm(this.schools[0]);
  }

  getSchoolForm(school: School){
    this.schoolForm.patchValue({
      name: school.name,
      owner: school.owner,
      city: school.city,
      zipCode: school.zipCode,
      nip: school.nip,
      date: school.date,
    });
  }

  onSubmit() {
    let school: School = {
      name: this.schoolForm.value.name,
      owner: this.schoolForm.value.owner,
      city: this.schoolForm.value.city,
      zipCode: this.schoolForm.value.zipCode,
      nip: this.schoolForm.value.nip,
      date: this.schoolForm.value.date,
    };
    this.editedSchools.push(school);
  }
}
