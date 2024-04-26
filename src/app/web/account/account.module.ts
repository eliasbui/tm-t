import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from "./account.component";
import { TitleConstants } from "@core/constants";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { InformationComponent } from "./information/information.component";
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: "",
    component: AccountComponent,
    resolve: {},
    children: [
      {
        path: "",
        redirectTo: "/account/information",
      },
      {
        path: "information",
        component: InformationComponent,
        data: {
          title: TitleConstants.Cart,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [AccountComponent, InformationComponent, ProfileModalComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ],
})
export class AccountModule {}
