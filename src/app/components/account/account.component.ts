import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  updateForm:FormGroup
  customer:Customer
  customerId:any

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private authservice:AuthService){}
  ngOnInit(): void {
    this.X();
    this.CreateUpdateForm();
    this.getById(this.customerId)
  }
  CreateUpdateForm(){
    this.updateForm=this.formBuilder.group({
      phoneNumber:["",Validators.required],
      nationalityId:["",Validators.required],
      birthDay:["",Validators.required],
    })
  }
  getById(id:string){
    this.authservice.getById(id).subscribe(response=>{
      if (response.success) {
        this.customer=response.data;
        this.updateForm.patchValue(this.customer);
        console.log(this.customer)
      }
    });
  }

  X(){
    this.customerId=localStorage.getItem("customerId")
  }

}
