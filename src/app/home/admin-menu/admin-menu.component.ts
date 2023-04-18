import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  active = '/home/schools';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.active]);
  }

}
