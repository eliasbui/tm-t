import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "ite-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public hoursLeft: any;
  public minutesLeft: any;
  public secondsLeft: any;

  constructor() {}
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  customOptionsProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
    nav: true,
  };

  customOptionsVoucher: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
    nav: true,
  };
  public slidesStore: any = [
    {
      id: 1,
      src: "./../../../assets/images/slider_1.webp",
    },
    {
      id: 2,
      src: "./../../../assets/images/slider_1.webp",
    },
  ];
  public voucher: any = [
    {
      id: 1,
      c: "Giảm 50%",
      subtitle: "Đơn tối thiểu 100k",
      src: "https://bizweb.dktcdn.net/100/479/080/themes/897121/assets/bg_sv1.jpg?1705909401286",
    },
    {
      id: 2,
      title: "Giảm 10k",
      subtitle: "Đơn tối thiểu 100k",
      src: "https://bizweb.dktcdn.net/100/479/080/themes/897121/assets/bg_sv2.jpg?1705909401286",
    },
    {
      id: 3,
      title: "Freeship",
      subtitle: "Đơn tối thiểu 100k",
      src: "https://bizweb.dktcdn.net/100/479/080/themes/897121/assets/bg_sv3.jpg?1705909401286",
    },
    {
      id: 4,
      title: "Giảm 2k",
      subtitle: "Đơn tối thiểu 100k",
      src: "https://bizweb.dktcdn.net/100/479/080/themes/897121/assets/bg_sv4.jpg?1705909401286",
    },
    {
      id: 5,
      title: "Giảm 200k",
      subtitle: "Đơn tối thiểu 100k",
      src: "https://bizweb.dktcdn.net/100/479/080/themes/897121/assets/bg_sv5.jpg?1705909401286",
    },
  ];

  public products: any = [
    {
      id: 1,
      title: "Xiaomi Mi Watch Phiên bản Esim (4G/LTE)",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/1-126a08a9-cfef-4dc1-9076-f22c741df1c8-1011aff3-698b-40a8-bccb-3b76afa5ba69.jpg?v=1677614077360",
    },
    {
      id: 2,
      title: "Apple Watch Series 7 GPS 45mm viền nhôm dây cao su",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/1-126a08a9-cfef-4dc1-9076-f22c741df1c8-1011aff3-698b-40a8-bccb-3b76afa5ba69.jpg?v=1677614077360",
    },
    {
      id: 3,
      title: "MacBook Pro 16-inch Max Option Apple M1 MAX 10",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/macbook-pro-16-inch-m1-2021-gray-828a5364-34d9-4349-a843-3cebe4720e79.jpg?v=1677614081773",
    },
    {
      id: 4,
      title: "Laptop Asus ROG Strix SCAR 18 G834JY-N6039W - Intel Core i9 - 13980HX | RTX 4090 16GB | 18 Inch QHD+ 240Hz",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/7869-scar-18-e1672832298197-ac9f9d9c-590c-49e6-b4d6-5906badee510.jpg?v=1677614085920",
    },
    {
      id: 5,
      title: "Samsung Galaxy S23 Ultra 5G (8GB|256GB) Chính Hãng",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/1-9b89edd8-44fd-4cd9-814d-3180bd171bd5-9320bb2d-8e33-4b1f-be0a-afe7c88b6c94.jpg?v=1677614097447",
    },
    {
      id: 6,
      title: "Điện thoại di động Apple iPhone 14 Plus - Hàng chính hãng",
      price: "450000",
      src: "https://bizweb.dktcdn.net/thumb/large/100/479/080/products/1-e25a091b-6d1d-4d3e-b4cb-98790bfd7c96.jpg?v=1677614104323",
    },
  ];
}
