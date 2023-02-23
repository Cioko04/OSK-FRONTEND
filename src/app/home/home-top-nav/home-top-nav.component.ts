import { UserService } from './../../user/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';

@Component({
  selector: 'app-home-top-nav',
  templateUrl: './home-top-nav.component.html',
  styleUrls: ['./home-top-nav.component.css'],
})
export class HomeTopNavComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/welcome']);
  }
}
