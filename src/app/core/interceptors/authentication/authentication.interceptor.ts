import { AuthenticationAndAuthorizationService } from "./../../services/authentification-and-authorization.service";

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalStorageType } from "@core/constants";
import { cryptoJSHelp } from "@core/helper/cryptoJS/cryptoJS";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private configAPI: any;
  private ignoreAPI: string[] = [];
  private baseUrlLogin = "";
  constructor(
    private router: Router,
    private authService: AuthenticationAndAuthorizationService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private config: ConfigService,
    private translate: TranslateService
  ) {
    this.configAPI = this.config.config.API_ENDPOINTS;
    this.baseUrlLogin =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        ? this.config.config.API_ENDPOINTS.URL_LOGIN_CENTER
        : "";
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(LocalStorageType.Token);
    const user = JSON.parse(
      localStorage.getItem(LocalStorageType.UserInformation)
    );
    if (req.url === this.configAPI.IP_API_URL) {
      return next.handle(req);
    } else {
      let newRequest;
      if (!accessToken) {
        newRequest = req.clone({
          headers: req.headers,
          body: {
            ...req.body,
          },
        });
        newRequest.headers = newRequest.headers
          .append("signature", cryptoJSHelp.hashValue(newRequest.body))
          .append("requestId", this.generateRequestId())
          .append("Encrypted-Body", cryptoJSHelp.hashBodyValue(newRequest.body));
      } else {
        if (!this.ignoreAPI.includes(req.url)) {
          let headers = req.headers.set(
            "Authorization",
            "Bearer " + accessToken
          );
          headers = headers
            .append("Cache-Control", "no-cache")
            .append("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            .append(
              "Access-Control-Allow-Headers",
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            )
            .append("Access-Control-Allow-Origin", "*")
            .append("Cache-Control", "no-store")
            .append("Expires", "0")
            .append("Pragma", "no-cache");
          newRequest = req.clone({
            headers,
            body: {
              ...req.body,
            },
          });
          newRequest.headers = newRequest.headers
            .append("Signature", cryptoJSHelp.hashValue(newRequest.body, accessToken))
            .append("requestId", this.generateRequestId())
            .append("email", user.email)
            .append("Encrypted-Body", cryptoJSHelp.hashBodyValue(newRequest.body));
        } else {
          let headers = req.headers.set(
            "Authorization",
            "Bearer " + accessToken
          );
          headers = headers
            .append("Cache-Control", "no-cache")
            .append("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            .append("Access-Control-Allow-Origin", "*")
            .append(
              "Access-Control-Allow-Headers",
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            )
            .append("Cache-Control", "no-store")
            .append("Expires", "0")
            .append("Pragma", "no-cache");
          newRequest = req.clone({
            headers,
            body: req.body,
          });
          newRequest.headers = newRequest.headers
            .append("Signature", cryptoJSHelp.hashValue(newRequest.body, accessToken))
            .append("requestId", this.generateRequestId())
            .append("Encrypted-Body", cryptoJSHelp.hashBodyValue(newRequest.body));
        }
      }
      return next.handle(newRequest).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: any) => {
          if (error.status === 302) {
            this.clear();
            this.router.navigate(["login"]);
          }
          if (error.status === 401 && !req.url.includes("login")) {
            if (error.error?.error_code === "77") {
              this.toastr.error("Invalid Signature");
            } else {
              this.clear();
              this.authService.logOut();
              this.toastr.error(this.translate.instant("session-timeout"));
              this.router.navigate(["login"]);
            }
          }
          if (error.status === 403 && !req.url.includes("login")) {
            this.dialog.closeAll();
            this.toastr.clear();
            this.router.navigate(["error-403"]);
            this.toastr.error(this.translate.instant("function-role"));
          }
          return throwError(error);
        })
      );
    }
  }

  clear() {
    let remember = null;
    if (localStorage.getItem(LocalStorageType.RememberMe)) {
      remember = localStorage.getItem(LocalStorageType.RememberMe);
    }
    localStorage.clear();
    if (remember != null) {
      localStorage.setItem(LocalStorageType.RememberMe, remember);
    }
    this.dialog.closeAll();
    this.toastr.clear();
  }
  private generateRequestId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let requestId = '';
    for (let i = 0; i < 36; i++) {
      requestId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return requestId;
  }
}
