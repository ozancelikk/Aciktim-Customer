import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Restaurant } from 'src/app/models/restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL:string = "https://localhost:44398/api/Restaurant";
  constructor(private httpClient:HttpClient) { }

  getAllRestaurants():Observable<ListResponseModel<Restaurant>> {
    return this.httpClient.get<ListResponseModel<Restaurant>>(this.apiURL +"/GetAll");
  }
}
