import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){}
  ngOnInit(): void {}

  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/"]);
    this.toastrService.success("Başarıyla Çıkış Yapıldı","BAŞARILI")
    
  }

}
