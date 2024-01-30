import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../shared/services/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | any = {};
  shouldOpenProfile: boolean = true;

  @ViewChild('navContent') navContent: ElementRef | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserByEmail(this.authenticationService.getSessionUserEmail())
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  logout() {
    this.router.navigate(['/welcome']);
  }

  openProfile(content: any) {
    this.shouldOpenProfile = true;
    this.open(content);
  }

  openSchool(content: any) {
    this.shouldOpenProfile = false;
    this.open(content);
  }

  private open(content: any) {
    this.offcanvasService.open(content, {
      position: 'end',
      scroll: true,
    });
  }
}
