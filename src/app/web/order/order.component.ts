import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonErrorCode } from "@core/constants";
import { cryptoJSHelp } from "@core/helper";
import { AuthenticationAndAuthorizationService } from "@core/services";
import { OrderService } from "@core/services/app/order/order.service";

@Component({
  selector: "ite-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  public state: any;
  public dataProduct: any;
  public addressForm: FormGroup;
  public submitted = false;
  public commonErrorCode = CommonErrorCode;
  public totalAmount: any;
  public convertMethod: boolean = false;
  public messageErrorConvert: string;
  public messageErrorPaymentMethods: string;
  public selectedOptionConvertValue: string;
  public selectedOptionPaymentMethodsValue: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationAndAuthorizationService,
    private router: Router,
    public fb: FormBuilder,
    private OrderService: OrderService
  ) {}

  ngOnInit(): void {
    this.state = String(this.route.snapshot.queryParams["state"]);
    if(!this.state || !this.authService.checkLogin()) {
      this.router.navigate(['/login']);
    }
    const decodedState = decodeURIComponent(this.state.replace(/\s+/g, "+"));
    this.dataProduct = cryptoJSHelp.decryptHashedValue(decodedState);
    this.calculateTotalAmount();
    console.log(this.dataProduct);
    
    this.addressForm = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
    });
  }
  get f() {
    return this.addressForm.controls;
  }
  calculateTotalAmount() {
    let totalAmount = 0;
    this.dataProduct.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    this.totalAmount = totalAmount;
  }

  onSubmit() {
    this.submitted = true;
  }
  enter($event) {
    this.addressForm.markAllAsTouched();
    this.onSubmit();
    $event.preventDefault();
  }
  selectedOption(deliveryMode) {
    if (deliveryMode === "DELIVERY") {
      this.convertMethod = true;
    } else {
      this.convertMethod = false;
    }
    this.selectedOptionConvertValue = deliveryMode;
  }
  selectedOptionPaymentMethods(value) {
    this.selectedOptionPaymentMethodsValue = value;
  }
  orderPay() {
    this.messageErrorConvert = "";
    this.messageErrorPaymentMethods = "";
    if (!this.selectedOptionConvertValue) {
      this.messageErrorConvert = "Vui lòng chọn phương thức vận chuyển";
      return;
    }
    if (!this.selectedOptionPaymentMethodsValue) {
      console.log(1);
      this.messageErrorPaymentMethods = "Vui lòng chọn phương thức thanh toán";
      return;
    }
    if (this.convertMethod) {
      this.submitted = true;
      if (this.addressForm.invalid) {
        return;
      }
    }
    const form = this.addressForm.value;
    console.log(form);
    const newDataProduct = this.dataProduct.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));
    const body = {
      orderInfo: {
        receiverName: form.name,
        receiverPhone: form.phoneNumber,
        address: form.address,
        deliveryMode: this.selectedOptionConvertValue,
        paymentMethod: this.selectedOptionPaymentMethodsValue,
      },
      orderItemInfo: newDataProduct
    };
    this.OrderService.createOrder(body).subscribe((data) => {
      console.log(data);
      
    });
  }
}
