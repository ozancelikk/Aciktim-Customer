import { Component, OnInit } from '@angular/core';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  totalPrice: number = 0;
  constructor() { }
  ngOnInit(): void {
    this.getItemsInCart();
  }

  getItemsInCart() {
    var productListString = localStorage.getItem("menus");
    this.itemsInCart = productListString ? JSON.parse(productListString) : [];
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