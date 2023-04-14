import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(): void {}

  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  logout(){
    this.authService.logout();
  }

}
