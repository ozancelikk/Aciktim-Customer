import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantBannerComponent } from './components/restaurant/restaurant-banner/restaurant-banner.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturedRestaurantsComponent } from './components/featured-restaurants/featured-restaurants.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantDetailComponent } from './components/restaurant/restaurant-detail/restaurant-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FoodComponent } from './components/food/food.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent,children:[
    {path:"",component:SliderComponent},
    {path:"",component:FeaturedRestaurantsComponent},
    {path:"",component:CategoriesComponent},
    {path:"",component:RestaurantsComponent},
  ]},
  {path:"restaurant/xx",component:RestaurantComponent,children:[
    {path:"",component:RestaurantBannerComponent},
    {path:"",component:RestaurantDetailComponent},
  ]},
  {path:"auth/login",component:LoginComponent},
  {path:"auth/register",component:RegisterComponent},
  {path:"account",component:AccountComponent},
  {path:"orders",component:OrdersComponent},
  {path:"foods",component:FoodComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
