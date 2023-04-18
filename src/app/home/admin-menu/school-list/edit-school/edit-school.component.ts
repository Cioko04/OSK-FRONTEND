import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
export class EditSchoolComponent implements OnInit {
  @Input() schoolToEdit!: School;
  @Output() schoolToEditChange = new EventEmitter<School>();

  schoolForm: any;

  constructor(private fb: FormBuilder) {
    this.schoolForm = this.fb.group({
      name: [''],
      owner: [''],
      city: [''],
      zipCode: [''],
      nip: [''],
      date: [''],
    });
  }

  ngOnInit(): void {
    this.schoolForm.patchValue({
      name: this.schoolToEdit.name,
      owner: this.schoolToEdit.owner,
      city: this.schoolToEdit.city,
      zipCode: this.schoolToEdit.zipCode,
      nip: this.schoolToEdit.nip,
      date: this.schoolToEdit.date,
    });
  }

  onSubmit() {
    this.schoolToEdit.name = this.schoolForm.value.name;
    this.schoolToEdit.owner = this.schoolForm.value.owner;
    this.schoolToEdit.city = this.schoolForm.value.city;
    this.schoolToEdit.zipCode = this.schoolForm.value.zipCode;
    this.schoolToEdit.nip = this.schoolForm.value.nip;
    this.schoolToEdit.date = this.schoolForm.value.date;
    this.schoolToEditChange.emit(this.schoolToEdit);
  }


  @Input()  size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  dec() { this.resize(-1); }
  inc() { this.resize(+1); }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
