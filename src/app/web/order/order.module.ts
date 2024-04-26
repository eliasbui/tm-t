import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
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
        component: OrderComponent,
        data: {
          title: TitleConstants.Order,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class OrderModule { }
