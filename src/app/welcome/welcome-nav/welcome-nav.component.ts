import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormType } from 'src/app/forms/core/data-types/FormType';

@Component({
  selector: 'app-welcome-nav',
  templateUrl: './welcome-nav.component.html',
  styleUrls: ['./welcome-nav.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeNavComponent implements OnInit {
  formType!: FormType;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  openLogin(content: any) {
    this.formType = FormType.LOGIN;
    this.open(content);
  }
  openRegister(content: any) {
    this.formType = FormType.SIGNUP;
    this.open(content);
  }
}
