import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css'],
})
export class MenuNavComponent implements OnInit {
  active = '/home/courses';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.active = this.router.url;
  }
}
