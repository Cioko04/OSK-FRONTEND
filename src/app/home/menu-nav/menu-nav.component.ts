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
  private parentPath: string = '/home/dashboard/';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.role = this.authenticationService.getSessionUserRole();
    this.setActive();
  }

  ngOnInit(): void {
    this.setMenuItems();
    this.router.navigate([this.getRouteToNavigate()]);
  }

  private getRouteToNavigate(): string {
    const segments = this.router.url.split('/');
    return segments.length < 4 ? this.active : this.router.url;
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
        this.active = `${this.parentPath}schools`;
        break;
      case 'OSK_ADMIN':
        this.active = `${this.parentPath}manage-courses`;
        break;
      case 'USER':
        this.active = `${this.parentPath}course-sign-up`;
        break;
    }
  }

  private setMenuItems() {
    if (this.role == 'ADMIN') {
      this.menuItems = [
        {
          label: 'Szkoły',
          icon: 'fa-university',
          link: `${this.parentPath}schools`,
        },
      ];
    } else if (this.role == 'OSK_ADMIN') {
      this.menuItems = [
        {
          label: 'Kursy',
          icon: 'fa-pencil-square-o',
          link: `${this.parentPath}manage-courses`,
        },
        {
          label: 'Instruktorzy',
          icon: 'fa-users',
          link: `${this.parentPath}instructors`,
        },
      ];
    } else if (this.role == 'USER') {
      this.menuItems = [
        {
          label: 'Zapisz się',
          icon: 'fa-calendar-plus-o',
          link: `${this.parentPath}course-sign-up`,
        },
        {
          label: 'Moje kursy',
          icon: 'fa-graduation-cap',
          link: `${this.parentPath}my-courses`,
        },
        {
          label: 'Płatności',
          icon: 'fa-credit-card',
          link: `${this.parentPath}payments`,
        },
      ];
    }
  }
}
