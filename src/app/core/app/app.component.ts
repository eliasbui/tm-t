import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { Title } from "@angular/platform-browser";
import {
  TitleConstants,
  LocalStorageType,
  LeftMenuKeyConfig,
} from "../constants";
import { TranslateService } from "@ngx-translate/core";
import {
  BrowserAndLocationInformationService,
  AuthenticationAndAuthorizationService,
  CartService,
} from "@core/services";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Component({
  selector: "ite-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private baseUrlLogin = "";
  public dataCartLocal: any;
  constructor(
    public translate: TranslateService,
    public browserService: BrowserAndLocationInformationService,
    public authenticationService: AuthenticationAndAuthorizationService,
    public location: Location,
    public toastr: ToastrService,
    private cartService: CartService,
    private config: ConfigService
  ) {
    translate.addLangs(["en", "vi"]);
    const lang = localStorage.getItem(LocalStorageType.CurrentLanguage)
      ? localStorage.getItem(LocalStorageType.CurrentLanguage)
      : "vi";
    translate.setDefaultLang(lang);
    translate.use(lang);
    this.browserService.setInfoToStorage();

    this.baseUrlLogin =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        ? this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        : "";
  }
  ngOnInit() {
    if (this.authenticationService.checkLogin()) {
      this.dataCartLocal = JSON.parse(
        localStorage.getItem(LocalStorageType.Cart)
      ) || [];
      if (this.dataCartLocal && this.dataCartLocal.length > 0) {
        this.cartService.autoAddToCart(this.dataCartLocal);
      }
    }
  }
  detectRefresh() {
    if (performance.navigation.type === 1) {
      return true;
    } else {
      return false;
    }
  }
  public doBeforeUnload(): void {
    this.detectRefresh();
  }
}
