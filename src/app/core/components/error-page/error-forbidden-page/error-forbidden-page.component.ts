import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageType } from "@core/constants";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Component({
  selector: "ite-error-forbidden-page",
  templateUrl: "./error-forbidden-page.component.html",
  styleUrls: ["./error-forbidden-page.component.scss"],
})
export class ErrorForbiddenPageComponent implements OnInit {
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
    if (url && url.trim() != "") {
      this.router.navigateByUrl(url);
    } else {
      // Chuyển về trang đăng nhập trung tâm
      window.location.href = this.baseUrlLogin;
      // this.router.navigate(['login']);
    }
  }
}
