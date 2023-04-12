import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm:FormGroup
  constructor(private authService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.createLoginForm();
  }
  
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      let model = Object.assign({},this.loginForm.value);
      console.log(model);
      this.authService.login(model).subscribe(response=>{
        if(response.success) {
          localStorage.setItem("token",response.data.token)
          this.toastrService.success("Giriş Başarılı","Başarılı");
          setTimeout(() => {
            this.router.navigate(["/"])
          }
          , 2000);
        }
      },error=>{
        this.toastrService.error(error.error)
        console.log("xx")
      })
    }
    else {
      this.toastrService.info("Lütfen bilgileri doldurunuz.","HATA")
    }
  }

}
