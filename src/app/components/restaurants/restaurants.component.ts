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

//FRONTENDDE OLANI BİR DAHA EKLIYOR ONU DÜZELT ! 
export class RestaurantsComponent implements OnInit {
  restaurants: RestaurantDto[];
  categories: CategoryDto[]
  deneme: RestaurantDto[]
  dizi: string[] = [];
  selectedOptionCategory: string;
  val: string;

  constructor(private restaurantService: RestaurantService, private toastrService: ToastrService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.getAllRestaurants();
    this.getCategories();
  }

  getAllRestaurants(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.restaurantService.getAllRestaurants().subscribe(response => {
      if (response.success) {
        this.restaurants = response.data;
        for (let i = 0; i < this.restaurants.length; i++) {
          this.restaurants[i].restaurantRate = (Math.floor(this.restaurants[i].restaurantRate))
        }
        if (successCallBack) {
          successCallBack();
        }
      }
    }, errorResponse => {
      errorCallBack(errorResponse.message);
    })
  }

  createArray(index:number):Array<number> {
    let rate = new Array(index)
    return rate
  }

  checkCheckBoxvalue(event: any) {
    this.val = event.target.value
    if (this.dizi.includes(event.target.value)) {
      let value = this.dizi.indexOf(event.target.value)
      this.dizi.splice(value, 1);
    }
    else {
      this.dizi.push(event.target.value);
    }
  }


  getRestaurantsByCategoryId() {
    let val: string = "";
    for (let i = 0; i < this.dizi.length; i++) {
      val += ","
      val += this.dizi[i];
    }
    this.restaurantService.getRestaurantsByCategoryId(val).subscribe(response => {
      if (response.success) {
        val == "" ? this.getAllRestaurants() : this.restaurants = response.data;
      }
    })
  }


  getAlphabetical() {
    this.restaurants.sort(function (a, b) {
      if (a.restaurantName.toLocaleLowerCase() < b.restaurantName.toLocaleLowerCase()) {
        return -1;
      }
      if (a.restaurantName.toLocaleLowerCase() > b.restaurantName.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  getByRestaurantRate() {
    this.restaurants.sort(function (a, b) {
      if (a.restaurantRate > b.restaurantRate) {
        return -1;
      }
      if (a.restaurantRate > b.restaurantRate) {
        return 1;
      }
      return 0;
    });
  }


  getByRate(elementId: number) {
    this.getAllRestaurants(() => {
      switch (elementId) {
        case 1:
          this.restaurants = this.restaurants.filter(x => x.restaurantRate >= 1);
          break;
        case 2:
          this.restaurants = this.restaurants.filter(x => x.restaurantRate >= 2);
          break;
        case 3:
          this.restaurants = this.restaurants.filter(x => x.restaurantRate >= 3);
          break;
        case 4:
          this.restaurants = this.restaurants.filter(x => x.restaurantRate >= 4);
          break;
        default:
          this.getAllRestaurants();
          break;
      }
    }, (errorMessage: string) => {
      this.toastrService.error(errorMessage)
    });

  }

  addFavoriteRestaurant(favoriteRestaurant: RestaurantDto) {
    let model = Object.assign({
      customerId: localStorage.getItem('customerId'),
      restaurantId: favoriteRestaurant.id
    }, favoriteRestaurant)
    this.restaurantService.addFavoriteService(model).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Restoran favori listesine başarıyla eklendi ! ", "BAŞARILI");
      }
    }, error => this.toastrService.error(error.error))

  }

  getImagePath(restaurantDto: RestaurantDto): string {
    let url: string;
    if (restaurantDto.imagePath == null) {
      url = "http://127.0.0.1:4200/Restaurant/noImage.png";
      return url;
    }
    else {
      url = "http://127.0.0.1:4200/Restaurant/" + restaurantDto.imagePath;
      return url;
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
      }
    })
  }

}
