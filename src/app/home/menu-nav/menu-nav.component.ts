import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css'],
})
export class MenuNavComponent implements OnInit {
  role: string;
  active: any;
  menuItems: any[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.role = this.authenticationService.getSessionUserRole();
    this.setActive();
  }

  ngOnInit(): void {
    this.setMenuItems();
    this.router.navigate([this.active]);
  }

  ngDoCheck(): void {
    this.active = this.formantActiveRoute();
  }

  private formantActiveRoute(): string {
    const segments = this.router.url.split('/');
    return segments.slice(0, 3).join('/');
  }

  private setActive() {
    switch (this.role.toString()) {
      case 'ADMIN':
        this.active = '/home/schools';
        break;
      case 'OSK_ADMIN':
        this.active = '/home/instructors';
        break;
      case 'USER':
        this.active = '/home/courses';
        break;
    }
  }

  private setMenuItems() {
    if (this.role == 'ADMIN') {
      this.menuItems = [
        {
          label: 'Szkoły',
          icon: 'fa-university',
          link: '/home/schools',
        },
      ];
    } else if (this.role == 'OSK_ADMIN') {
      this.menuItems = [
        {
          label: 'Instruktorzy',
          icon: 'fa-users',
          link: '/home/instructors',
        },
        {
          label: 'Zarządzaj kursami',
          icon: 'fa-pencil-square-o',
          link: '/home/manage-courses',
        },
      ];
    } else if (this.role == 'USER') {
      this.menuItems = [
        {
          label: 'Zarezerwuj',
          icon: 'fa-calendar-plus-o',
          link: '/home/courses',
        },
        {
          label: 'Moje kursy',
          icon: 'fa-graduation-cap',
          link: '/home/my-courses',
        },
        {
          label: 'Płatności',
          icon: 'fa-credit-card',
          link: '/home/payments',
        },
      ];
    }
  }
}
