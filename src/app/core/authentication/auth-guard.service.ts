import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from "@angular/router";
import { LocalStorageType, SESSION_TIME } from "@core/constants";
import { AuthenticationAndAuthorizationService } from "@core/services";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable()
export class AuthGuardService implements CanActivateChild {
  private baseUrlLogin = "";

  constructor(
    private router: Router,
    private authService: AuthenticationAndAuthorizationService,
    private dialogRef: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService,
    private config: ConfigService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem(LocalStorageType.Token) &&
      localStorage.getItem(LocalStorageType.UserInformation)
    ) {
      if (!this.checkSessionTimeout()) {
        this.router.navigate(["/login"]);
        return false;
      }
    }
    return true;
  }

  checkSessionTimeout() {
    const currentTime = moment().toDate().getTime();
    const loginTime = Number(
      localStorage.getItem(LocalStorageType.LastLoginDate)
    );
    if (currentTime - loginTime > 1800 * 1000) {
      const remember = localStorage.getItem(LocalStorageType.RememberMe);
      localStorage.clear();
      if (remember != null) {
        localStorage.setItem(LocalStorageType.RememberMe, remember);
      }
      this.dialogRef.closeAll();
      this.toastr.error(this.translate.instant("session-timeout"));
      return false;
    } else {
      localStorage.setItem(LocalStorageType.SessionTimeOut, currentTime + "");
      return true;
    }
  }
}
