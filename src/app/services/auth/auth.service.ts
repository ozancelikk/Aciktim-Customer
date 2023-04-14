import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login } from 'src/app/models/auth/login';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

import { Observable } from 'rxjs';
import { Register } from 'src/app/models/auth/register';
import { Token } from 'src/app/models/auth/token';
import { CustomerDto } from 'src/app/models/customer/customerDto';
import { Customer } from 'src/app/models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string = "https://localhost:44398/api/Auth";
  apiURL2:string = "https://localhost:44398/api/Customer";

  constructor(private httpClient:HttpClient) { }

  login(login:Login):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL + "/login",login);
  }

  register(register:Register):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL +"/register",register);
  }
  getById(id:string):Observable<SingleResponseModel<Customer>>{
    return this.httpClient.get<SingleResponseModel<Customer>>(this.apiURL2+"/GetById?id="+id)
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("customerId")
    localStorage.removeItem("expiration")
  }
}
