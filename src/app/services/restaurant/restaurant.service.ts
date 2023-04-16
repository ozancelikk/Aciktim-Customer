import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL:string = "https://localhost:44398/api/Restaurant";
  apiURL2:string = "https://localhost:44398/api/Menu";
  constructor(private httpClient:HttpClient) { }
  

  getAllRestaurants():Observable<ListResponseModel<RestaurantDto>> {
    return this.httpClient.get<ListResponseModel<RestaurantDto>>(this.apiURL +"/GetAllWithImage");
  }

  getRestaurantDetails(restaurantId:string):Observable<SingleResponseModel<RestaurantDto>>{
    return this.httpClient.get<SingleResponseModel<RestaurantDto>>(this.apiURL +"/getdetailsdtobyid?id="+restaurantId);
  }

  getRestaurantMenusByRestaurantId(restaurantId:string):Observable<ListResponseModel<RestaurantMenu>>{
    return this.httpClient.get<ListResponseModel<RestaurantMenu>>(this.apiURL2 +"/GetMenuDetailsByRestaurantId?restaurantId=" + restaurantId);
  }
}
