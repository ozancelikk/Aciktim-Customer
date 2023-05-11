import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoriteRestaurantDto } from 'src/app/models/restaurant/favoriteRestaurantDto';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.css']
})
export class FavoriteRestaurantsComponent implements OnInit {
  favoriteRestaurants: FavoriteRestaurantDto[]
  customerId: any;
  rate = new Array(0)
  constructor(private restaurantService: RestaurantService, private toastrService: ToastrService,private router:Router) { }
  ngOnInit(): void {
    this.getCustomerId();
    this.getFavoriteRestaurantsByCustomerId(this.customerId)
  }

  getCustomerId() {
    this.customerId = localStorage.getItem('customerId')
  }
  getFavoriteRestaurantsByCustomerId(customerId: string) {
    this.restaurantService.getFavoriteRestaurantsByCustomerId(customerId).subscribe(response => {
      if (response.success) {
        this.favoriteRestaurants = response.data;
        console.log(this.favoriteRestaurants);
        
      }
    })
  }

  deleteFavoriteRestaurant(id: string) {
    this.restaurantService.deleteFavoriteRestaurant(id).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Restoran başarıyla silindi ! ", "BAŞARILI");
        this.getFavoriteRestaurantsByCustomerId(this.customerId)
      }
    })
  }

  getRestaurantImagePath(favoriteRestaurant: FavoriteRestaurantDto): string {
    let url: string;
    if (favoriteRestaurant.imagePath == null) {
      url = "http://127.0.0.1:4200/Restaurant/noImage.png";
      return url;
    }
    else {
      url = "http://127.0.0.1:4200/Restaurant/"  + favoriteRestaurant.imagePath
      return url;
    }

  }
  route(restaurant:FavoriteRestaurantDto){
    if (restaurant.restaurantStatus==false) {
      this.toastrService.error("Restoran Şuanda Kapalıdır!","HATA");
    }
    else{
      this.router.navigate([`/restaurant/${restaurant.id}`])
    }
  }
  restaurantPassiveColor(restaurant:RestaurantDto){
    if (restaurant.restaurantStatus==false) {
      return "color"
    }else{
      return "";
    }
  }
}
