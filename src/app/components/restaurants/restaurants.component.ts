import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants:Restaurant[];
  constructor(private restaurantService:RestaurantService,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(response=>{
      if(response.success) {
        this.restaurants = response.data;
        console.log(this.restaurants)
      }
    })
  }
}
