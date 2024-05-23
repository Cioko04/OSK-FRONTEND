import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetails } from '../../../../shared/common/card/card.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menuItems: CardDetails[] = [];

  constructor(private router: Router) {
    this.addMenuItems();
  }

  private addMenuItems() {
    this.menuItems = [
      {
        imagePath: 'course-sing-in.png',
        label: 'Zapisz się na KURS',
        route: 'course',
        aspectRatio: '8/5',
        accentColor: 'hsl(214, 80%, 40%)',
        height: 60,
      },
      {
        imagePath: 'additional-lesson-sign-in.png',
        label: 'Zapisz się na DODATKOWE JAZDY',
        route: 'lesson',
        aspectRatio: '8/5',
        accentColor: 'hsl(70, 80%, 40%)',
        height: 60,
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([`/home/dashboard/sign-up/${route}`]);
  }
}
