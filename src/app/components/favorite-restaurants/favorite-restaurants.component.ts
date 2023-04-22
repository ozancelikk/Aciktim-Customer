import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteRestaurantDto } from 'src/app/models/restaurant/favoriteRestaurantDto';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.css']
})
export class FavoriteRestaurantsComponent implements OnInit {
  favoriteRestaurants : FavoriteRestaurantDto[]
  customerId:any;
  rate = new Array(0)
  constructor(private restaurantService:RestaurantService,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getCustomerId();
    this.getFavoriteRestaurantsByCustomerId(this.customerId)
  }

  getCustomerId() {
    this.customerId =  localStorage.getItem('customerId')
  }
  getFavoriteRestaurantsByCustomerId(customerId:string) {
    this.restaurantService.getFavoriteRestaurantsByCustomerId(customerId).subscribe(response=>{
      if(response.success) {
        this.favoriteRestaurants =response.data;
      }
    })
  }

  deleteFavoriteRestaurant(id:string){
    this.restaurantService.deleteFavoriteRestaurant(id).subscribe(response=>{
      if(response.success) {
        this.toastrService.success("Restoran başarıyla silindi ! ","BAŞARILI");
        this.getFavoriteRestaurantsByCustomerId(this.customerId)
      }
    })
  }

  getRestaurantImagePath(favoriteRestaurant:FavoriteRestaurantDto):string {
    let url = "http://127.0.0.1:4200/Restaurant/" + favoriteRestaurant.restaurantId + "/" + favoriteRestaurant.imagePath
    return url;
  }

}
