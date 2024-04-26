import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TitleConstants } from 'src/app/core/constants';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HomeComponent } from './home.component';
const routes: Routes = [
  {
    path: '',
    resolve: {},
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: TitleConstants.HOME
        }
      }
    ]
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class HomeModule { }
