import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerAddress } from 'src/app/models/customer/customerAddress';
import { OrderDto } from 'src/app/models/order/orderDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  totalPrice: number = 0;
  customer:Customer;
  customerId:string;
  description:string;
  selectedOption: string;
  createOrderForm:FormGroup;
  customerAddress:CustomerAddress[];
  constructor(private authService:AuthService,private orderService:OrderService,private customerService:CustomerService,private toastrService:ToastrService,private router:Router,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.getCustomerId();
    this.getItemsInCart();
    this.getCustomerDetailsByCustomerId();
    this.getCustomerAddress();
  }

  getItemsInCart() {
    var productListString = localStorage.getItem("menus");
    this.itemsInCart = productListString ? JSON.parse(productListString) : [];
    console.log(this.itemsInCart)
  }
  getCustomerAddress(){
    this.customerService.getAddressDetailsByCustomerId(this.customerId).subscribe(response=>{
      if (response.success) {
        this.customerAddress=response.data
        console.log(this.customerAddress)
      }
    })
  }




  createOrder(){
    this.createOrderForm=this.formBuilder.group({
      customerId:[this.customerId,Validators.required],
      orderDescription:[this.description,Validators.required],
      firstName:[this.customer.firstName,Validators.required],
      lastName:[this.customer.firstName,Validators.required],
      address:[this.selectedOption,Validators.required],
      phoneNumber:[this.customer.phoneNumber,Validators.required],
      orderStatus:["Sipariş alındı",Validators.required],
      estimatedTime:["30 Dk",Validators.required],
      menus: this.formBuilder.array([]), 
    })
    let model = Object.assign({},this.createOrderForm.value)
    
    for (let i = 0; i < this.itemsInCart.length; i++) {
      const creds = this.createOrderForm.controls.menu as FormArray;
      creds.push(this.formBuilder.group({
        "restaurantId":this.itemsInCart[i].restaurantName,
        "orderPrice":this.itemsInCart[i].menuPrice,
        "menuName":this.itemsInCart[i].menuTitle,
        "quantity":this.itemsInCart[i].quantity,
      }));

      this.orderService.add(model).subscribe(response=>{
      })
      
    }


    this.toastrService.success("Siparişiniz Başarıyla Alındı","BAŞARILI");
    localStorage.removeItem("menus")
    setTimeout(()=>{
      this.router.navigate(["/orders"])
    },1000)
    
    
  }

  getCustomerId(){
    this.customerId=localStorage.getItem("customerId")!;
  }

  getCustomerDetailsByCustomerId(){
    this.authService.getById(this.customerId).subscribe(response =>{
      if (response.success) {
        this.customer=response.data;
        console.log(this.customer);
      }
    },errResponse=>{
      console.log(errResponse)
    });

  }

  calculatePrice(restaurantDto: RestaurantMenu) {
    let totalPrice = restaurantDto.quantity * restaurantDto.menuPrice
    this.totalPrice = totalPrice;
    return totalPrice
  }

  increase(restaurantDto: RestaurantMenu) {
    var productListString = localStorage.getItem("menus");
    var productList = productListString ? JSON.parse(productListString) : []; //eski liste
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id == restaurantDto.id) {
        if(productList[i].quantity > 0) { // Check if quantity is greater than 1
          productList[i].quantity++; // Decrease quantity by 1
        }
        localStorage.setItem('menus', JSON.stringify(productList));
        this.getItemsInCart();
        break;
      }
    }
  }

  decrease(restaurantDto: RestaurantMenu) {
    if(restaurantDto.quantity >= 0) {
      var productListString = localStorage.getItem("menus");
      var productList = productListString ? JSON.parse(productListString) : []; //eski liste
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == restaurantDto.id) {
          if(productList[i].quantity > 1) { // Check if quantity is greater than 1
            productList[i].quantity--; // Decrease quantity by 1
          } else {
            productList.splice(i, 1);
          }
          localStorage.setItem('menus', JSON.stringify(productList));
          this.getItemsInCart();
          break;
        }
      }
    }
  }

  calculateTotal() {
    var productListString = localStorage.getItem("menus");
    let totalPrice = 0;
    var productList = productListString ? JSON.parse(productListString) : []; //menulermız
    for (let i = 0; i < productList.length; i++) {
      totalPrice+=productList[i].menuPrice * productList[i].quantity 
    }
    return totalPrice;
  }
}



/*
decrease(restaurantDto: RestaurantMenu) {
    if (restaurantDto.quantity == 1) {
      var productListString = localStorage.getItem("menus");
      var productList = productListString ? JSON.parse(productListString) : [];
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == restaurantDto.id) {
          productList.splice(i, 1);
          localStorage.setItem('menus', JSON.stringify(productList));
          this.getItemsInCart()
          break
        }
      }
    }
    restaurantDto.quantity -= 1;
  } */
  /*/*
*/ 
  // createOrder(){
  //   for (let i = 0; i < this.itemsInCart.length; i++) {
  //     var model={
  //       "customerId":this.customerId,
  //       "restaurantId":this.itemsInCart[i].restaurantName,
  //       "orderPrice":this.itemsInCart[i].menuPrice,
  //       "orderDescription":this.description,
  //       "menuName":this.itemsInCart[i].menuTitle,
  //       "firstName":this.customer.firstName,
  //       "lastName":this.customer.lastName,
  //       "address":this.selectedOption,
  //       "phoneNumber":this.customer.phoneNumber,
  //       "orderStatus":"Sipariş Alındı",
  //       "estimatedTime":"30 Dk",
  //       "quantity":this.itemsInCart[i].quantity,
  //     }
  //     this.orderService.add(model).subscribe(response=>{
  //     })
      
  //   }
  //   this.toastrService.success("Siparişiniz Başarıyla Alındı","BAŞARILI");
  //   localStorage.removeItem("menus")
  //   setTimeout(()=>{
  //     this.router.navigate(["/orders"])
  //   },1000)
    
    
  // }