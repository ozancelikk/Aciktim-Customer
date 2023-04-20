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
  orders: Order[]
  menus: []
  constructor(private orderService: OrderService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getCustomerId()
    this.getOrderDetailsByCustomerId();
  }


  getCustomerId() {
    this.customerId = localStorage.getItem('customerId')
  }

  getOrderDetailsByCustomerId() {
    this.orderService.getOrderDetailsByCustomerId(this.customerId).subscribe(response => {
      if (response.success) {
        this.orders = response.data;
      }
    })
  }

}
