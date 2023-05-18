import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-check-if-private-key',
  templateUrl: './check-if-private-key.component.html',
  styleUrls: ['./check-if-private-key.component.css']
})
export class CheckIfPrivateKeyComponent implements OnInit {
  mail:any
  form:FormGroup;
  password:any
  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router,private formBuilder:FormBuilder,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.createPrivateKeyform();
    this.getMail(); 
  }
  checkIfPrivateKey(key:string,mail:string){
    this.authService.checkIfPrivateKeyIsTrue(key,mail).subscribe(response=>{
      if (response.success) {
        this.toastrService.success("Aktivasyon İşlemi Başarılıdır")
        setTimeout(() => {
          this.router.navigate(["/auth/login"])
        }, 600);
      }else{
        this.toastrService.error("Aktivasyon Başarısızdır");
      }
      
    },errResponse=>{
      this.toastrService.error("Aktivasyon Kodunuz yanlıştır")
    })
  }
  createPrivateKeyform(){
    this.form=this.formBuilder.group({
      key:["",Validators.required],
      mail:["",Validators.required]
    })
  }
  getMail(){
    this.mail = this.route.snapshot.paramMap.get('email');
    console.log(this.mail);
    
  }
}
