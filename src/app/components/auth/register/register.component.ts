import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  registerForm:FormGroup
  verifyPassword:string;
  password:string
  constructor(private toastrService:ToastrService,private authservice:AuthService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
    })
  }
  register(){
    if (this.registerForm.valid) {
      let model = Object.assign({},this.registerForm.value);
      if (this.password==this.verifyPassword) {
        this.authservice.register(model).subscribe(response=>{
          if (response.success) {
            localStorage.setItem("registerToken",response.data.token);
            this.toastrService.info("E-Mailinize doğrulama linki gönderilmiştir.","Kayıt Başarılı") 
            setTimeout(()=>{
              this.router.navigate(["/"]);
            },2700)
          }
        },errResponse=>{
          console.log(errResponse)
        })
      }else{
        this.toastrService.info("Şifreyi Aynı Giriniz")
      }
      
    }else{
      this.toastrService.info("Lütfen Bilgiler Doldurun","HATA")
    }
  }
  
}
