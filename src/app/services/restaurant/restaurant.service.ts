import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL:string = "https://localhost:44398/api/Restaurant";
  constructor(private httpClient:HttpClient) { }

  getAllRestaurants():Observable<ListResponseModel<RestaurantDto>> {
    return this.httpClient.get<ListResponseModel<RestaurantDto>>(this.apiURL +"/GetAllWithImage");
  }
}
