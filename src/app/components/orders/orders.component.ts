import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { OrderDto } from 'src/app/models/order/orderDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  customerId: any;
  competedOrders: Order[]
  menus: [];
  filter:string;
  activeOrders : Order[]
  constructor(private orderService: OrderService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getCustomerId()
    this.getCompletedOrderDetailsByCustomerId();
    this.getActiveOrderDetailsByCustomerId();
  }


  getCustomerId() {
    this.customerId = localStorage.getItem('customerId')
  }

  getCompletedOrderDetailsByCustomerId() {
    this.orderService.getCompletedOrderDetailsByCustomerId(this.customerId).subscribe(response => {
      if (response.success) {
        this.competedOrders = response.data;
      }
    })
  }
  getActiveOrderDetailsByCustomerId() {
    this.orderService.getActiveOrderDetailsByCustomerId(this.customerId).subscribe(response=>{
      if (response.success) {
        this.activeOrders = response.data;
      }
    })
  }

}
