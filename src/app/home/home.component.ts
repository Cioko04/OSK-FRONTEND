import { UserProfileComponent } from './../user/user-profile/user-profile.component';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/welcome']);
  }

  open(content: any) {
    const offcanvasRef = this.offcanvasService.open(content, {
      position: 'end',
      scroll: true,
    });
    offcanvasRef.componentInstance.name = 'World';
  }
}
