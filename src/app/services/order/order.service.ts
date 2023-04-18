import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
