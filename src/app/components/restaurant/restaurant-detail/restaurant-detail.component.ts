import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: RestaurantDto;
  star: number;
  rate = new Array(0)
  remainderRate = new Array(0)
  restaurantMenuDetails: RestaurantMenu[]
  filtered: string;
  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getRestaurantDetail(params["restaurantId"])
      this.getRestaurantMenusByRestaurantId(params["restaurantId"])
    })
  }

  getRestaurantDetail(restaurantId: string) {
    this.restaurantService.getRestaurantDetails(restaurantId).subscribe(response => {
      if (response.success) {
        this.restaurant = response.data;
        this.star = response.data.restaurantRate;
        this.rate = new Array(this.restaurant.restaurantRate)
        this.remainderRate = new Array(5 - this.restaurant.restaurantRate)
      }
    })
  }

  getImagePath(restaurantDto: RestaurantDto): string {
    let url = "http://127.0.0.1:4200/Restaurant/" + restaurantDto.id + "/" + restaurantDto.imagePath
    return url;
  }

  getRestaurantMenusByRestaurantId(restaurantId: string) {
    this.restaurantService.getRestaurantMenusByRestaurantId(restaurantId).subscribe(response => {
      if (response.success) {
        this.restaurantMenuDetails = response.data;
      }
    })
  }

  getMenusImagePath(restaurantDto: RestaurantMenu): string {
    let url = "http://127.0.0.1:4200/Menu/" + restaurantDto.id + "/" + restaurantDto.menuImage
    return url;
  }

  addCart(menu: RestaurantMenu) {
    var newItem = {
      'menuTitle': menu.menuTitle,
      'menuImage': menu.menuImage,
      'menuPrice': menu.menuPrice,
      'id': menu.id,
      'menuDescription': menu.menuDescription,
      'restaurantName':menu.restaurantName,
      'quantity': 1,
      'customerId':localStorage.getItem('customerId'),
      'restaurantId':menu.restaurantId
    };

    var productAlreadyExists:boolean = false;
    var productListString = localStorage.getItem("menus");
    var productList = productListString ? JSON.parse(productListString) : [];
    
    for (let i = 0; i < productList.length; i++) {
      if(productList[i].id == menu.id) {
        productList[i].quantity+=1;
        productAlreadyExists = true;
        break;
      }  
    }
    if(productAlreadyExists == false) {
      productList.push(newItem);
    }
    localStorage.setItem("menus", JSON.stringify(productList));
   
  }
}
