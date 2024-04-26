import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageType } from "@core/constants";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Component({
  selector: "ite-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent implements OnInit {
  private baseUrlLogin = "";

  constructor(private router: Router, private config: ConfigService) {
    this.baseUrlLogin =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        ? this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        : "";
  }

  ngOnInit(): void {}

  navigateToHomePage() {
    let url = localStorage.getItem(LocalStorageType.DefaultUrl);
    if (url && url.trim() !== "") {
      this.router.navigateByUrl(url);
    } else {
      // Chuyển về trang đăng nhập trung tâm
      window.location.href = this.baseUrlLogin;
      // this.router.navigate(['login']);
    }
  }
}
