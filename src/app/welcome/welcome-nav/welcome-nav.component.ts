import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NgbOffcanvas,
  NgbOffcanvasConfig,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome-nav',
  templateUrl: './welcome-nav.component.html',
  styleUrls: ['./welcome-nav.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeNavComponent implements OnInit {
  closeResult = '';
  openPage = '';
  constructor(
    private offcanvasService: NgbOffcanvas
  ) {
  }

  ngOnInit(): void {}
  open(content: any) {
    this.offcanvasService.open(content, {
      position: 'top',
    });
  }
  openLogin(content: any) {
    this.openPage = 'login';
    this.open(content);
  }
  openRegister(content: any) {
    this.openPage = 'register';
    this.open(content);
  }
}
