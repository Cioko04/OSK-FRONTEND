import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetails } from '../../../../shared/common/card/card.component';

@Component({
  selector: 'app-course-sign-up-menu',
  templateUrl: './course-sign-up-menu.component.html',
  styleUrls: ['./course-sign-up-menu.component.css'],
})
export class CourseSignUpMenuComponent {
  menuItems: CardDetails[] = [];

  constructor(private router: Router) {
    this.addMenuItems();
  }

  private addMenuItems() {
    this.menuItems = [
      {
        imagePath: 'course-sing-in.png',
        label: 'Zapisz się na KURS',
        route: 'choose-category',
        aspectRatio: '8/5',
        accentColor: 'hsl(214, 80%, 40%)',
        left: 65,
        height: 60,
      },
      {
        imagePath: 'additional-lesson-sign-in.png',
        label: 'Zapisz się na DODATKOWE JAZDY',
        route: 'payments',
        aspectRatio: '8/5',
        accentColor: 'hsl(70, 80%, 40%)',
        left: 65,
        height: 60,
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([`/home/dashboard/course-sign-up/${route}`]);
  }
}
