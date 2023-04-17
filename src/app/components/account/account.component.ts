import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/app/models/customer/changePassword';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerAddress } from 'src/app/models/customer/customerAddress';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  updateForm: FormGroup;
  addAddressForm:FormGroup;
  customer: Customer
  customerId: any
  firstName:string;
  lastName:string;
  mailAddress:string;
  phoneNumber:string;
  nationalityId:string;
  birthDay:string;
  changePasswordForm:FormGroup;
  customerAddresses:CustomerAddress[];
  verifyPassword:string;
  password:string;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
     private authservice: AuthService,private customerService:CustomerService,private router:Router) { }
  ngOnInit(): void {
    this.GetCustomerId();
    this.getCustomerAddressesByCustomerId(this.customerId);
    this.getById(this.customerId)
    this.createAddAddressForm();
    this.CreateUpdateForm();
    this.createChangePasswordForm();
    
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
      registerDate:[new Date().toLocaleDateString(),Validators.required]
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
      }
    });
  }

  
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required],
    });
  }

  changePassword() {
    let model =Object.assign({},this.changePasswordForm.value);
    model["eMail"] = this.mailAddress;
    if(this.changePasswordForm.valid) {
      if(this.verifyPassword != this.password) {
        this.toastrService.error("Şifreler Uyuşmuyor","HATA");
      }
      else {
        this.authservice.changePassword(model).subscribe(response=>{
          if(response.success) {
            this.toastrService.success("Şifreniz Başarıyla Değiştirildi","BAŞARILI")
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }
        },error=>{
          this.toastrService.error(error.error,"HATA");
        })
      }
    }
    else {
      this.toastrService.error("Lütfen bilgileri eksiksiz giriniz","HATA");
    }
  }

  getCustomerAddressesByCustomerId(customerId:string) {
    this.customerService.getAddressDetailsByCustomerId(customerId).subscribe(response=>{
      if(response.success) {
        this.customerAddresses = response.data;
      }
    })
  }

  createAddAddressForm() {
    this.addAddressForm = this.formBuilder.group({
      customerId:[this.customerId,Validators.required],
      city:["",Validators.required],
      county:["",Validators.required],
      neighbourHood:["",Validators.required],
      street:["",Validators.required],
      apartmentNumber:["",Validators.required],
      doorNumber:["",Validators.required],
      address:["",Validators.required]
    })
  }

  addAddress() {
    let model = Object.assign({},this.addAddressForm.value)
    if(this.addAddressForm.valid) {
      this.customerService.addAddress(model).subscribe(response=>{
        if(response.success) {
          this.toastrService.success("Adres başarıyla eklendi","BAŞARILI");
        }
      })
    }
    else {
      this.toastrService.error("Lütfen bilgileri eksiksiz olarak giriniz.","HATA");
    }
  }

  GetCustomerId() {
    this.customerId = localStorage.getItem("customerId")
  }
  updateUser() {
    let model = Object.assign({}, this.updateForm.value);
    if(this.updateForm.valid) {
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
    else  {
      this.toastrService.error("Lütfen ilgili alanları giriniz.","HATA")
    }
  }
}



