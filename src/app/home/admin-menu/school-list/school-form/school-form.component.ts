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
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SchoolFormComponent implements OnInit {
  @Input() schoolToEdit!: School;
  @Output() schoolToEditChange = new EventEmitter<School>();
  @Input() shouldAdd!: boolean;
  schoolForm: any;
  buttonText: string | any;

  constructor(private fb: FormBuilder) {
    this.schoolForm = this.fb.group({
      schoolName: [''],
      city: [''],
      zipCode: [''],
      nip: [''],
      date: [''],
      owner: this.fb.group({

      })
    }
    );
  }

  ngOnInit(): void {
    this.buttonText = this.shouldAdd ? "Dodaj" : "Zmień";
    this.schoolForm.patchValue({
      schoolName: this.schoolToEdit.schoolName,
      city: this.schoolToEdit.city,
      zipCode: this.schoolToEdit.zipCode,
      nip: this.schoolToEdit.nip,
      date: this.schoolToEdit.addDate,
    });
  }

  onSubmit() {
    this.schoolToEdit.schoolName = this.schoolForm.value.schoolName;
    this.schoolToEdit.city = this.schoolForm.value.city;
    this.schoolToEdit.zipCode = this.schoolForm.value.zipCode;
    this.schoolToEdit.nip = this.schoolForm.value.nip;
    this.schoolToEdit.addDate = this.schoolForm.value.date;
    if (this.shouldAdd) {
      let date = new Date();
      this.schoolToEdit.addDate = [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-');
    }
    this.schoolToEditChange.emit(this.schoolToEdit);
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
