import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css']
})
export class SchoolProfileComponent implements OnInit {
  schoolForm: FormGroup;
  submitted: boolean = false;

  @Output()
  eventBack = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.schoolForm = this.formBuilder.group({
      school: [],
    });
  }

  ngOnInit(): void {
  }

  submit() {
  }

}
