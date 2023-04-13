import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/models/category/categoryDto';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:CategoryDto[];
  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(response=>{
        if(response.success) {
          this.categories = response.data;
          console.log(this.categories)
        }
    })
  }

  getImagePath(categoryDto:CategoryDto) {
    let url="https://localhost:44398/Uploads/Images/Category/" + categoryDto.id +"/" +  categoryDto.imagePath
    return url;
  }

}
