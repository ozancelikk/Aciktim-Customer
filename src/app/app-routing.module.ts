import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantBannerComponent } from './components/restaurant/restaurant-banner/restaurant-banner.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturedRestaurantsComponent } from './components/featured-restaurants/featured-restaurants.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent,children:[
    {path:"",component:SliderComponent},
    {path:"",component:FeaturedRestaurantsComponent},
    {path:"",component:CategoriesComponent},
    {path:"",component:RestaurantsComponent},
  ]},
  {path:"restaurant/xx",component:RestaurantComponent,children:[
    {path:"",component:RestaurantBannerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
