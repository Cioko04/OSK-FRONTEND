import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetails } from '../../../../shared/common/card/card.component';
import { HeadArray } from 'src/app/shared/core/BaseEntityComponent';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menuItems: CardDetails[] = [];

  headArray: HeadArray[] = [
    { head: '', fieldName: 'label' },
  ];

  constructor(private router: Router) {
    this.addMenuItems();
  }

  private addMenuItems() {
    this.menuItems = [
      {
        sourceId: 1,
        imagePath: 'course-sing-in.png',
        label: 'KURS',
        aspectRatio: '8/4',
        accentColor: 'hsl(214, 80%, 40%)',
        height: 60,
      },
      {
        sourceId: 2,
        imagePath: 'additional-lesson-sign-in.png',
        label: 'DODATKOWE JAZDY',
        aspectRatio: '8/4',
        accentColor: 'hsl(70, 80%, 40%)',
        height: 60,
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([`/home/dashboard/sign-up/${route}`]);
  }
}
