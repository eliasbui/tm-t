import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ite-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() title: string;
  @Input() image: string;
  @Input() price: string;
  constructor() {
    
   }

  ngOnInit(): void {
  }
}
