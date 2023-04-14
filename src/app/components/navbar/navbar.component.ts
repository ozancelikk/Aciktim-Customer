import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {}

  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
