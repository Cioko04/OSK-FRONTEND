import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas
  ) {
    config.position = 'top';
  }

  ngOnInit(): void {}
  open(content: any){
    this.offcanvasService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  openLogin(content: any) {
    this.openPage = 'login';
    this.open(content);
  }
  openRegister(content: any) {
    this.openPage = 'register';
    this.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
