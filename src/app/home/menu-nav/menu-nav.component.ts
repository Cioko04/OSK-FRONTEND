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
    this.active = this.formatActiveRoute();
  }

  private formatActiveRoute(): string {
    const segments = this.router.url.split('/');
    return segments.slice(0, 4).join('/');
  }

  private setActive() {
    switch (this.role.toString()) {
      case 'ADMIN':
        this.active = '/home/admin-dashboard/schools';
        break;
      case 'OSK_ADMIN':
        this.active = '/home/osk-dashboard/manage-courses';
        break;
      case 'USER':
        this.active = '/home/user-dashboard/course-sign-up';
        break;
    }
  }

  private setMenuItems() {
    if (this.role == 'ADMIN') {
      this.menuItems = [
        {
          label: 'Szkoły',
          icon: 'fa-university',
          link: '/home/admin-dashboard/schools',
        },
      ];
    } else if (this.role == 'OSK_ADMIN') {
      this.menuItems = [
        {
          label: 'Kursy',
          icon: 'fa-pencil-square-o',
          link: '/home/osk-dashboard/manage-courses',
        },
        {
          label: 'Instruktorzy',
          icon: 'fa-users',
          link: '/home/osk-dashboard/instructors',
        },
      ];
    } else if (this.role == 'USER') {
      this.menuItems = [
        {
          label: 'Zapisz się',
          icon: 'fa-calendar-plus-o',
          link: '/home/user-dashboard/course-sign-up',
        },
        {
          label: 'Moje kursy',
          icon: 'fa-graduation-cap',
          link: '/home/user-dashboard/my-courses',
        },
        {
          label: 'Płatności',
          icon: 'fa-credit-card',
          link: '/home/user-dashboard/payments',
        },
      ];
    }
  }
}
