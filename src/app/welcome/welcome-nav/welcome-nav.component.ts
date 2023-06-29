import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NgbModal,
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
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
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
