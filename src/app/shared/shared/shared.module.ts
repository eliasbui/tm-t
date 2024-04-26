import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '@core/components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { MaterialModule } from './material.module';
import { CarouselModule } from "ngx-owl-carousel-o";
import { ProductItemComponent } from '@core/components/product-item/product-item.component';
import { GalleryModule } from "ng-gallery";

const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  PipesModule,
  DirectivesModule,
  MaterialModule,
  TranslateModule,
  CarouselModule,
  GalleryModule
];

@NgModule({
  declarations: [PaginationComponent, ProductItemComponent],
  imports: [
    ...MODULES,
  ],
  exports: [
    HttpClientModule,
    ...MODULES,
    DeviceDetectorModule,
    PaginationComponent,
    ProductItemComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

