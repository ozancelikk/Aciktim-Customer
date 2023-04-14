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
  star:number;
  rate = new Array(0)
  remainderRate = new Array(0)
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
        this.star = response.data.restaurantRate;
        this.rate = new Array(this.restaurant.restaurantRate)
        this.remainderRate = new Array(5 - this.restaurant.restaurantRate)
        console.log(this.restaurant)
      }
    })
  }

  getImagePath(restaurantDto:RestaurantDto):string{
    let url="http://127.0.0.1:4200/Restaurant/" + restaurantDto.id + "/" + restaurantDto.imagePath
    return url;
  }


}
