import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared/shared.module";
import { LoginComponent } from "@core/components/login/login.component";
import { RegisterComponent } from "@core/components/register/register.component";
import { ForgotPasswordComponent } from "@core/components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "@core/components/reset-password/reset-password.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    data: { preload: true },
  },
  {
    path: "product",
    loadChildren: () =>
      import("./product/product.module").then((m) => m.ProductModule),
    data: { preload: true },
  },
  {
    path: "cart",
    loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
    data: { preload: true },
  },
  {
    path: "order",
    loadChildren: () =>
      import("./order/order.module").then((m) => m.OrderModule),
    data: { preload: true },
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
    data: { preload: true },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  declarations: [],
})
export class WebModule {}
