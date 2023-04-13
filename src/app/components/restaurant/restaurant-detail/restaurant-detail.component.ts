import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: RestaurantDto;
  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(params => {
      this.getRestaurantDetail(params["restaurantId"])
    })
  }

  getRestaurantDetail(restaurantId: string) {
    this.restaurantService.getRestaurantDetails(restaurantId).subscribe(response => {
      if (response.success) {
        this.restaurant = response.data;
        console.log(this.restaurant)
      }
    })
  }

  getImagePath(restaurantDto:RestaurantDto):string{
    let url="https://localhost:44398/Uploads/Images/Restaurant/" + restaurantDto.id + "/" + restaurantDto.imagePath
    return url;
  }
}
