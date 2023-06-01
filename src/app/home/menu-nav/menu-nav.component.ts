import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css'],
})
export class MenuNavComponent implements OnInit {
  role: string;
  active: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.role = this.authenticationService.getSessionUserRole();
    this.setActive();
  }

  ngOnInit(): void {
    this.router.navigate([this.active]);
  }

  ngDoCheck(): void {
    this.active = this.router.url;
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
}
