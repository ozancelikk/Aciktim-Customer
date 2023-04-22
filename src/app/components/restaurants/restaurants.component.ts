import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteRestaurantDto } from 'src/app/models/restaurant/favoriteRestaurantDto';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants:RestaurantDto[];
  constructor(private restaurantService:RestaurantService,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(response=>{
      if(response.success) {
        this.restaurants = response.data;
      }
    })
  }

  addFavoriteRestaurant(favoriteRestaurant:RestaurantDto) {
    let model = Object.assign({
      customerId:localStorage.getItem('customerId'),
      restaurantId:favoriteRestaurant.id
    },favoriteRestaurant)
    this.restaurantService.addFavoriteService(model).subscribe(response=>{
      if(response.success) {
        console.log(model)
        this.toastrService.success("Restoran favori listesine başarıyla eklendi ! ","BAŞARILI");
      }
    },error=>this.toastrService.error(error.error))
    
  }

  getImagePath(restaurantDto:RestaurantDto):string{
    let url="http://127.0.0.1:4200/Restaurant/" + restaurantDto.imagePath
    return url;
  }
}
