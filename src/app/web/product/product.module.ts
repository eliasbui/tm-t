import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleConstants } from '@core/constants';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    resolve: {},
    children: [
      {
        path: '',
        component: ProductComponent,
        data: {
          title: TitleConstants.Product,
        },
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
        data: {
          title: TitleConstants.Product,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class ProductModule { }
