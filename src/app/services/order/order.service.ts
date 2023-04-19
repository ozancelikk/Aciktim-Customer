import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Order } from 'src/app/models/order/order';
import { OrderDto } from 'src/app/models/order/orderDto';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44398/api/Order";

  add(dto:OrderDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl +"/add",dto);
  }

  getOrderDetailsByCustomerId(customerId:string):Observable<ListResponseModel<Order>>{
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl +"/GetOrdersByCustomerId?customerId=" + customerId);
  }

}
