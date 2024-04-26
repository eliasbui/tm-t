import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared/shared.module";
import { AppComponent } from "./app/app.component";
import { DialogConfirmComponent } from "./components/common/dialogs/dialog-confirm/dialog-confirm.component";
import { FooterButtonComponent } from "./components/common/footer-button/footer-button.component";
import { ImageViewByFileComponent } from "./components/common/image-view-by-file/image-view-by-file.component";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorForbiddenPageComponent } from './components/error-page/error-forbidden-page/error-forbidden-page.component';
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { SuccessDialogComponent } from "./components/forgot-password/success-dialog/success-dialog.component";
import { LoginComponent } from "./components/login/login.component";
import { NotificationDialogComponent } from "./components/notification-dialog/notification-dialog.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { DirectivesModule } from "./directives/directives.module";
import { BreadcrumbComponent } from "./layout/breadcrumb/breadcrumb.component";
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from "./layout/layout.component";
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    ErrorForbiddenPageComponent,
    RegisterComponent,
    BreadcrumbComponent,
    FooterButtonComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SuccessDialogComponent,
    DialogConfirmComponent,
    ImageViewByFileComponent,
    NotificationDialogComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TranslateModule,
  ],
  entryComponents: [
  ],
  exports: [
    AppComponent,
    DirectivesModule,
    LayoutComponent,
    LoginComponent,
    ErrorForbiddenPageComponent,
    RegisterComponent,
  ],
})
export class CoreModule { }
