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
  updateForm: FormGroup
  customer: Customer
  customerId: any
  firstName:string;
  lastName:string;
  mailAddress:string;
  phoneNumber:string;
  nationalityId:string;
  birthDay:string;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private authservice: AuthService) { }
  ngOnInit(): void {
    this.GetCustomerId();
    this.CreateUpdateForm();
    this.getById(this.customerId)
  }
  CreateUpdateForm() {
    this.updateForm = this.formBuilder.group({
      phoneNumber: ["", Validators.required],
      nationalityId: ["", Validators.required],
      birthDay: ["", Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      mailAddress: [this.mailAddress, Validators.required],
      id: ["", Validators.required],
    })
  }
  getById(id: string) {
    this.authservice.getById(id).subscribe(response => {
      if (response.success) {
        this.customer = response.data;
        this.updateForm.patchValue(this.customer);
        this.firstName = this.customer?.firstName;
        this.lastName = this.customer?.lastName;
        this.mailAddress = this.customer?.mailAddress;
        this.phoneNumber = this.customer?.phoneNumber;
        this.birthDay = this.customer?.birthDay;
        this.nationalityId = this.customer?.nationalityId;
        console.log(this.customer)
      }
    });
  }

  GetCustomerId() {
    this.customerId = localStorage.getItem("customerId")
  }
  updateUser() {
    let model = Object.assign({}, this.updateForm.value);
    if(this.nationalityId!=null || this.birthDay!=null) {
      alert("Bilgilerinizi daha önce zaten güncellemişsiniz!")
    }
    else {
      this.authservice.updateCustomer(model).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Bilgiler başarıyla Güncellendi", "BAŞARILI");
        }
      })
    } 
  }
}


//patch value not al