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
  user$: Observable<User | any>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private userService: UserService
  ) {
    this.user$ = userService.getUserByEmail(authenticationService.getSessionUserEmail());
  }

  ngOnInit(): void {

  }

  logout() {
    this.router.navigate(['/welcome']);
  }

  open(content: any) {
    const offcanvasRef = this.offcanvasService.open(content, {
      position: 'end',
      scroll: true,
    });
  }
}
