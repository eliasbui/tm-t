import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TitleConstants } from "../constants";
import { LayoutComponent } from "../layout/layout.component";
// import { AuthGuardService } from '@core/authentication/auth-guard.service';
import { AuthGuardService } from "@core/authentication/auth-guard.service";
import { ErrorForbiddenPageComponent } from "@core/components/error-page/error-forbidden-page/error-forbidden-page.component";
import { PageNotFoundComponent } from "@core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("src/app/web/web.module").then((m) => m.WebModule),
    data: { preload: true },
    resolve: {},
  },
  {
    path: "error-403",
    component: ErrorForbiddenPageComponent,
    data: {
      title: TitleConstants.ERR_FORBIDDEN,
    },
    canActivate: [],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    data: {
      title: TitleConstants.PAGE_NOT_FOUND,
    },
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
