import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/models/order/orderDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  constructor() { }
  ngOnInit(): void {
    this.getItemsInCart();
  }

  getItemsInCart() {
    var productListString = localStorage.getItem("menus");
    this.itemsInCart = productListString ? JSON.parse(productListString) : [];
  }

  
}
