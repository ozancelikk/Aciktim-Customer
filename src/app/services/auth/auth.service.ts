import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login } from 'src/app/models/auth/login';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

import { Observable } from 'rxjs';
import { Register } from 'src/app/models/auth/register';
import { Token } from 'src/app/models/auth/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string = "https://localhost:44398/api/Auth";

  constructor(private httpClient:HttpClient) { }

  login(login:Login):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL + "/login",login);
  }

  register(register:Register):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL +"/register",register);
  }
}
