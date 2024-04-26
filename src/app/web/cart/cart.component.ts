import { ConfirmationDialogComponent } from "@core/components/confirmation-dialog/confirmation-dialog.component";
import { CartService } from "./../../core/services/app/cart/cart.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationExtras, Router } from "@angular/router";
import { cryptoJSHelp } from "@core/helper";
import { AuthenticationAndAuthorizationService } from "@core/services";
import { LocalStorageType } from "@core/constants";

@Component({
  selector: "ite-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  @ViewChild("selectAllCheckbox")
  selectAllCheckbox: ElementRef<HTMLInputElement>;
  public totalAmount = 0;

  public productCart: any;

  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationAndAuthorizationService,
    private cartService: CartService,
    private router: Router
  ) {}
  cartItem = [];
  ngOnInit(): void {
    this.loadData();
  }
  checkedItems: number[] = [];
  loadData() {
    if (this.authenticationService.checkLogin()) {
      this.cartService.getCartDetailByUser().subscribe((data) => {
        this.productCart = data;
      });
    } else {
      this.productCart =
        JSON.parse(localStorage.getItem(LocalStorageType.Cart)) || [];
    }
  }
  handleSelectAll(e: any): void {
    this.selectAllCheckbox.nativeElement.checked = e.target.checked;
    this.checkedItems = e.target.checked
      ? this.productCart.map((item) => item.productId)
      : [];
    this.calculateTotalAmount();
  }

  handleCheckboxChange(itemId: number): void {
    if (this.checkedItems.includes(itemId)) {
      this.checkedItems = this.checkedItems.filter(
        (productId) => productId !== itemId
      );
    } else {
      this.checkedItems.push(itemId);
    }
    this.calculateTotalAmount();
  }
  handleUpdateQuantity(id, quantity, check) {
    let quantityUpdate = check === "increase" ? quantity + 1 : quantity - 1;
    const existingItemIndex = this.productCart.findIndex(
      (item) => item.productId === id
    );

    if (quantityUpdate > 0) {
      if (this.authenticationService.checkLogin()) {
        const body = { productId: id, quantity: quantityUpdate };
        this.cartService.updateProductCartById(body).subscribe((data) => {
          console.log(data);
          this.loadData();
        });
      } else {
        if (existingItemIndex !== -1) {
          this.productCart[existingItemIndex].quantity = quantityUpdate;
          localStorage.setItem(
            LocalStorageType.Cart,
            JSON.stringify(this.productCart)
          );
        }
      }
    } else {
      if (this.authenticationService.checkLogin()) {
        this.removeProduct(id);
      } else {
        if (existingItemIndex !== -1) {
          this.removeProduct(existingItemIndex)
        }
      }
    }
  }

  removeProduct(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        title: "Xóa sản phẩm khỏi giỏ hàng",
        subtitle: "Bạn có chắc chắn muốn xóa sản phẩm?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.authenticationService.checkLogin()) {
          this.cartService.removeProductCartById(id).subscribe((data) => {
            this.loadData();
          });
        } else {
          this.productCart.splice(id, 1);
          localStorage.setItem(
            LocalStorageType.Cart,
            JSON.stringify(this.productCart)
          );
        }
      }
    });
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.productCart.forEach((item) => {
      if (this.checkedItems.includes(item.productId)) {
        this.totalAmount += item.price * item.quantity;
      }
    });
    console.log(this.totalAmount);
  }
  order() {
    let dataProduct = [];
    this.productCart.forEach((item) => {
      if (this.checkedItems.includes(item.productId)) {
        dataProduct.push(item);
      }
    });
    const state = cryptoJSHelp.hashBodyValue(dataProduct);
    console.log(state);

    this.router.navigateByUrl(`/order?state=${state}`);
  }
  home() {
    this.router.navigate(["/"]);
  }
}
