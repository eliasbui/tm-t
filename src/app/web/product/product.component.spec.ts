import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from '@core/components/product-item/product-item.component';
import { ProductComponent } from './product.component';
import { PaginationComponent } from '@core/components/pagination/pagination.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent, ProductItemComponent, PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
