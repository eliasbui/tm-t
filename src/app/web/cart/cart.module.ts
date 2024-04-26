import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TitleConstants } from '@core/constants';


const routes: Routes = [
  {
    path: '',
    resolve: {},
    children: [
      {
        path: '',
        component: CartComponent,
        data: {
          title: TitleConstants.Cart,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class CartModule { }
