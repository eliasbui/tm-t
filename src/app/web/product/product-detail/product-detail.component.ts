import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalStorageType } from "@core/constants";
import { LocalizeService } from "@core/localization";
import {
  AuthenticationAndAuthorizationService,
  CartService,
} from "@core/services";
import { ProductService } from "@core/services/app/product/product.service";
import { GalleryItem } from "ng-gallery";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ite-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  dataLocal: any;
  public hoursLeft: any;
  public product_detail: any;
  public minutesLeft: any;
  public secondsLeft: any;
  public quantity: number = 1;
  images: GalleryItem[];
  images_light_gallery: any[];
  public urlImages: any;
  public id: any;
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private localizeService: LocalizeService,
    private authService: AuthenticationAndAuthorizationService,
    private toastService: ToastrService
  ) {
    this.router.paramMap.subscribe((param) => {
      this.id = String(param.get("id"));
      this.productService.getById(this.id).subscribe((data) => {
        this.product_detail = data;
        this.urlImages = data.urlImage;
      });
    });
  }

  ngOnInit(): void {
    this.updateRemainingTime();
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }
  updateRemainingTime() {
    const currentTime = new Date();
    const endOfDay = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      23,
      59,
      59
    );
    const timeDiff = endOfDay.getTime() - currentTime.getTime();
    this.hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    this.minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    this.secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
  }

  increase_quantity() {
    if (this.quantity === this.product_detail.quanlity) {
      return;
    }
    this.quantity += 1;
  }
  reduce_quantity() {
    if (this.quantity == 1) {
      return;
    }
    this.quantity -= 1;
  }
  activeImageIndex: number = 0;

  selectImage(index: number) {
    this.activeImageIndex = index;
  }
  nextSlide() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.urlImages.length;
  }

  prevSlide() {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.urlImages.length) %
      this.urlImages.length;
  }

  addToCart() {
    const body = {
      productId: this.id,
      quantity: this.quantity,
    };
    if (this.authService.checkLogin()) {
      this.cartService.addToCart(body).subscribe(
        (data) => {
          const message = this.localizeService.instant("add_to_cart.code_00");
          this.toastService.success(message);
        },
        (eror) => {
          const message = this.localizeService.instant("add_to_cart.code_01");
          this.toastService.error(message);
        }
      );
    } else {
      this.dataLocal =
        JSON.parse(localStorage.getItem(LocalStorageType.Cart)) || [];
      const existingItemIndex = this.dataLocal.findIndex(
        (item) => item.productId === body.productId
      );
      if (existingItemIndex !== -1) {
        this.dataLocal[existingItemIndex].quantity += body.quantity;
      } else {
        const product = {
          ...body,
          productName: this.product_detail.productName,
          price: this.product_detail.price,
          urlImage: this.product_detail.urlImage[0],
        };
        this.dataLocal.push(product);
      }
      localStorage.setItem(
        LocalStorageType.Cart,
        JSON.stringify(this.dataLocal)
      );
      const message = this.localizeService.instant("add_to_cart.code_00");
      this.toastService.success(message);
    }
  }
}
