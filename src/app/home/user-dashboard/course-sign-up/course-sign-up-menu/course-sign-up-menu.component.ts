import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
  imagePath: string;
  type: string;
  text: string;
  route: string;
}

@Component({
  selector: 'app-course-sign-up-menu',
  templateUrl: './course-sign-up-menu.component.html',
  styleUrls: ['./course-sign-up-menu.component.css'],
})
export class CourseSignUpMenuComponent {
  menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.addMenuItems();
  }

  private addMenuItems() {
    this.menuItems = [
      {
        imagePath: 'course-sing-in.png',
        type: 'course',
        text: 'Zapisz się na KURS',
        route: 'choose-school',
      },
      {
        imagePath: 'additional-lesson-sign-in.png',
        type: 'lesson',
        text: 'Zapisz się na DODATKOWE JAZDY',
        route: 'payments',
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([`/home/course-sign-up/${route}`]);
  }
}
