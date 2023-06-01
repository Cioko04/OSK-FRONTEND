import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user/user';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.authenticationService.getSessionUserEmail()).subscribe((user: User) => {
      this.user = user;
  });

  }

  logout() {
    this.router.navigate(['/welcome']);
  }

  open(content: any) {
    this.offcanvasService.open(content, {
      position: 'end',
      scroll: true,
    });
  }
}
