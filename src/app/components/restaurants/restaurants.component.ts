import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryDto } from 'src/app/models/category/categoryDto';
import { FavoriteRestaurantDto } from 'src/app/models/restaurant/favoriteRestaurantDto';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { CategoryService } from 'src/app/services/category/category.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants:RestaurantDto[];
  categories:CategoryDto[]
  deneme:RestaurantDto[]
  constructor(private restaurantService:RestaurantService,private toastrService:ToastrService,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.getAllRestaurants();
    this.getCategories();
    this.getRestaurantsByCategoryId("64387b1dcc5430f1fc6e9d33");
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
        this.toastrService.success("Restoran favori listesine başarıyla eklendi ! ","BAŞARILI");
      }
    },error=>this.toastrService.error(error.error))
    
  }

  getImagePath(restaurantDto:RestaurantDto):string{
    let url:string;
    if(restaurantDto.imagePath == null) {
       url = "http://127.0.0.1:4200/Restaurant/noImage.png";
      return url;
    }
    else {
     url="http://127.0.0.1:4200/Restaurant/" + restaurantDto.imagePath;
    return url;
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(response=>{
      if(response.success) {
        this.categories = response.data;
        console.log(this.categories);
      }
    })
  }

  getRestaurantsByCategoryId(categoryId:string) {
    this.restaurantService.getRestaurantsByCategoryId(categoryId).subscribe(response=>{
      if(response.success) {
        this.deneme = response.data;
        console.log(this.deneme);
      }
    })
  }
}
