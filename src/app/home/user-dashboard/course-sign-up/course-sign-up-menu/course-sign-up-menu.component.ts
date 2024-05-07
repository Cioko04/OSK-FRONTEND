import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-sign-up-menu',
  templateUrl: './course-sign-up-menu.component.html',
  styleUrls: ['./course-sign-up-menu.component.css'],
})
export class CourseSignUpMenuComponent {

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([`/home/course-sign-up/${route}`]);
  }
}
