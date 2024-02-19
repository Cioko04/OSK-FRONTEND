import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCourseComponent implements OnInit{
  selected: Date | undefined;

  constructor() {
    
  }

  ngOnInit(): void {
  
  }
  
}
