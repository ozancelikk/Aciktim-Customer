import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantComment } from 'src/app/models/restaurant/restaurantComment';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { OrdersComponent } from '../../orders/orders.component';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: RestaurantDto;
  star: number;
  addCommentForm: FormGroup;
  rate = new Array(0);
  remainderRate = new Array(0);
  restaurantMenuDetails: RestaurantMenu[];
  filtered: string;
  restaurantStatus: boolean = true;
  restaurantId: string;
  restaurantImage: string;
  customerId: any
  restaurantCommentsByCustomerId: RestaurantComment[]
  restaurantOrdersByCustomerAndRestaurantId: Order[]

  comments: RestaurantComment[];
  status: boolean = true
  id: any; // parametreden gelen restoran id
  restaurantRate = new Array(0);
  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCustomerId()
      this.getRestaurantDetail(params['restaurantId']);
      this.getRestaurantMenusByRestaurantId(params['restaurantId']);
      this.id = this.activatedRoute.snapshot.paramMap.get('restaurantId');
      this.getRestaurantCommentsByRestaurantId();
      this.createAddForm();
      this.asd();
      this.getRestaurantcommentsByCustomerId(this.customerId, this.id)
      this.getRestaurantOrdersByCustomerAndRestaurantId(this.customerId, this.id)
    });
  }

  createAddForm() {
    this.addCommentForm = this.formBuilder.group({
      restaurantId: [this.id, Validators.required],
      customerId: [localStorage.getItem('customerId'), Validators.required],
      commentTitle: ['', Validators.required],
      commentContent: ['', Validators.required],
      commentDate: [new Date().toLocaleDateString(), Validators.required],
      restaurantRate: ['', Validators.required],
      answer: [""],
      answerDate: [''],
      id: [""],
    });
  }
  getCustomerId() {
    this.customerId = localStorage.getItem('customerId')
  }

  getRate(element: number) {
    this.restaurantRate = new Array(element);
    return this.restaurantRate;
  }
  addComment() {
    if (localStorage.getItem('customerId')) {
      if (this.restaurantCommentsByCustomerId.length <= this.restaurantOrdersByCustomerAndRestaurantId.length) {
        if (this.addCommentForm.valid) {
          let model = Object.assign({}, this.addCommentForm.value);
          this.restaurantService.addComment(model).subscribe(
            (response) => {
              if (response.success) {
                this.toastrService.success(
                  'Yorumunuz başarıyla eklendi!',
                  'BAŞARILI'
                );
               this.getRestaurantCommentsByRestaurantId();
               this.getRestaurantOrdersByCustomerAndRestaurantId(this.customerId,this.id);
               this.getRestaurantcommentsByCustomerId(this.customerId,this.id);
              }
            },
            (error) => this.toastrService.error(error.error)
          );
        } else {
          this.toastrService.info('Lütfen ilgili alanları doldurunuz!', 'HATA');
        }
      } else {
        this.toastrService.error("Verdiğiniz Sipariş Sayısı Kadar Yorum Yapabilirsiniz.", "HATA")
      }

    } else {
      this.toastrService.error('Yorum yapmak için önce giriş yapınız!', 'HATA');
    }
  }

  getRestaurantDetail(restaurantId: string, successCallBack?: () => void) {
    this.restaurantService
      .getRestaurantDetails(restaurantId)
      .subscribe((response) => {
        if (response.success) {
          this.restaurant = response.data;
          this.restaurantStatus = this.restaurant.restaurantStatus;
          this.star = response.data.restaurantRate;
          this.rate = new Array(Math.floor(this.restaurant.restaurantRate));
          this.remainderRate = new Array(
            5 - Math.floor(this.restaurant.restaurantRate)
          );
          this.restaurantImage = response.data.imagePath;
          if (successCallBack) {
            successCallBack();
          }
        }
      });
  }

  asd() {
    this.getRestaurantDetail(this.id, () => {
      const now = new Date();
      const datePipe = new DatePipe('en-US');
      const hourMinute = datePipe.transform(now, 'HH:mm');
      if (this.restaurant.openingTime < this.restaurant.closingTime) {
        // Kapanış saati, aynı günün içinde
        if (hourMinute >= this.restaurant.openingTime && hourMinute < this.restaurant.closingTime && this.restaurant.restaurantStatus == true) {
          this.status = true
          this.restaurantStatus = true
        } else {
          this.status = false
          this.restaurantStatus = false
        }
      } else if (this.restaurant.restaurantStatus == false) {
        this.status = false
        this.restaurantStatus = false
      } else {
        // Kapanış saati, bir sonraki günün başlangıcını ifade ediyor
        if (hourMinute >= this.restaurant.openingTime || hourMinute < this.restaurant.closingTime || this.restaurant.restaurantStatus == true) {
          this.status = true
          this.restaurantStatus = true
        } else {
          this.status = false
          this.restaurantStatus = false
        }
      }
    });
  }
  getImagePath(restaurantDto: RestaurantDto): string {
    let url: string;
    return restaurantDto.imagePath != null
      ? 'http://127.0.0.1:4200/Restaurant/' +
      restaurantDto.id +
      '/' +
      restaurantDto.imagePath
      : 'http://127.0.0.1:4200/Restaurant/noImage.png';
  }

  getRestaurantMenusByRestaurantId(restaurantId: string) {
    this.restaurantService
      .getRestaurantMenusByRestaurantId(restaurantId)
      .subscribe((response) => {
        if (response.success) {
          this.restaurantMenuDetails = response.data;
        }
      });
  }

  getMenusImagePath(restaurantDto: RestaurantMenu): string {
    return restaurantDto.menuImage == null
      ? 'http://127.0.0.1:4200/Restaurant/noImage.png'
      : 'http://127.0.0.1:4200/Menu/' +
      restaurantDto.id +
      '/' +
      restaurantDto.menuImage;
  }

  addCart(menu: RestaurantMenu) {
    var newItem = {
      menuTitle: menu.menuTitle,
      menuImage:
        menu.menuImage == null
          ? 'http://127.0.0.1:4200/Menu/noImage.png'
          : 'http://127.0.0.1:4200/Menu/' + menu.id + '/' + menu.menuImage,
      menuPrice: menu.menuPrice,
      id: menu.id,
      menuDescription: menu.menuDescription,
      restaurantName: menu.restaurantName,
      quantity: 1,
      customerId: localStorage.getItem('customerId'),
      restaurantId: menu.restaurantId,
      restaurantImage: this.restaurantImage,
    };
    var productListString = localStorage.getItem('menus');
    var productList = productListString ? JSON.parse(productListString) : [];

    if (productList.length != 0) {
      var temp = productList[0];
      this.restaurantId = temp.restaurantId;
    }
    if (this.restaurantId == this.id || productList.length == 0) {
      var productAlreadyExists: boolean = false;
      var productListString = localStorage.getItem('menus');
      var productList = productListString ? JSON.parse(productListString) : [];

      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == menu.id) {
          productList[i].quantity += 1;
          productAlreadyExists = true;
          this.toastrService.success(
            'Ürün başarıyla sepete eklendi!',
            'BAŞARILI'
          );
          break;
        }
      }
      if (productAlreadyExists == false) {
        this.toastrService.success(
          'Ürün başarıyla sepete eklendi!',
          'BAŞARILI'
        );
        productList.push(newItem);
      }
      localStorage.setItem('menus', JSON.stringify(productList));
    } else {
      this.toastrService.info(
        'Sepetinizde zaten başka bir restoranın ürünü var!',
        'HATA'
      );
    }
  }

  getRestaurantCommentsByRestaurantId() {
    this.restaurantService
      .getRestaurantCommentsByRestaurantId(this.id)
      .subscribe((response) => {
        if (response.success) {
          this.comments = response.data;
          this.comments = this.comments.reverse();
        }
      });
  }
  getRestaurantcommentsByCustomerId(customerId: string, restaurantId: string) {
    this.restaurantService.getRestaurantCommentsByCustomerId(customerId, restaurantId).subscribe(response => {
      response.success ? this.restaurantCommentsByCustomerId = response.data : this.toastrService.error("Bir Hata Meydana Geldi", "HATA")

    })
  }
  getRestaurantOrdersByCustomerAndRestaurantId(customerId: string, restaurantId: string) {
    this.orderService.getOrdersByRestaurantAndCustomerId(customerId, restaurantId).subscribe(response => {
      response.success ? this.restaurantOrdersByCustomerAndRestaurantId = response.data : this.toastrService.error("Bir Hata Meydana Geldi", "HATA")
    })
  }
}
