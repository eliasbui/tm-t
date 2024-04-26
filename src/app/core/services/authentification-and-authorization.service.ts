import { Injectable } from "@angular/core";
import { UserInformationModel } from "@core/models";
import {
  LocalStorageType,
  langSettings,
  LeftMenuKeyConfig,
} from "@core/constants";
import { BehaviorSubject, Observable } from "rxjs";
import { Md5Help, cryptoJSHelp } from "@core/helper";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { ConfigService } from "./configuration/configuration.service";
import { ToastrService } from "ngx-toastr";
import { ProfileShare } from "./app/profile/profile-share.service";

@Injectable({ providedIn: "root" })
export class AuthenticationAndAuthorizationService {
  private permissionList = [];
  private permissionUrl = [];
  private userInformation: UserInformationModel = null;
  private baseUrl = "";
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  selectedIsLoggedIn$ = this.isLoggedIn$.asObservable();
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private dialogRef: MatDialog,
    private config: ConfigService,
    private toastr: ToastrService,
    public profileShareService: ProfileShare
  ) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.REAL_API_URL
        ? this.config.config.API_ENDPOINTS.REAL_API_URL
        : "";
    if (!this.userInformation) {
      const userInformation: string = localStorage.getItem(
        LocalStorageType.UserInformation
      );
      if (userInformation) {
        this.userInformation = JSON.parse(userInformation);
      }
    }
  }
  public getSideBarConfig(): any {
    return JSON.parse(localStorage.getItem(LocalStorageType.SideBarConfig));
  }
  public setSideBarConfig(value: string) {
    localStorage.setItem(LocalStorageType.SideBarConfig, value);
  }
  doLogin(
    userName: string,
    password: string
  ): Observable<UserInformationModel> {
    const body = {
      email: userName,
      password: cryptoJSHelp.hashBodyValuePass(password),
    };
    return this.http.post(`${this.baseUrl}/ecommerce/login`, body).pipe(
      map((data: any) => {
        localStorage.setItem(LocalStorageType.ExpiredTime, data.expired);
        this.addLoginResultToLocalStorage(data.user_info);
        localStorage.setItem(LocalStorageType.Token, data.accessToken);
        localStorage.setItem(LocalStorageType.RefreshToken, data.refreshToken);
        this.profileShareService.setProfileInfo(
          data.user_info.avatar,
          data.user_info.name
        );
        this.setProduct(true)
        return data;
      })
    );
  }

  addLoginResultToLocalStorage(user: UserInformationModel) {
    this.userInformation = {
      ...user,
      userId: user.id,
    };
    localStorage.setItem(
      LocalStorageType.UserInformation,
      JSON.stringify(user)
    );
    localStorage.setItem(LocalStorageType.Token, user.access_token);
    localStorage.setItem(LocalStorageType.RefreshToken, user.refresh_token);

    // merchant key dùng cho nhúng iframe phần quản lý ví
    // hiện tại đang fix cứng, về sau sửa theo api trả về
    localStorage.setItem(LocalStorageType.MerchantKey, "6bFsiXtEJ4G2S1bEIC6U");
  }
  public logOut(): Observable<boolean> {
    const body = {};
    return this.http.get(`${this.baseUrl}/ecommerce/logout`, body).pipe(
      map((data: any) => {
        this.userInformation = null;
        let remember = null;
        if (localStorage.getItem(LocalStorageType.RememberMe)) {
          remember = localStorage.getItem(LocalStorageType.RememberMe);
        }
        localStorage.clear();
        if (remember != null) {
          localStorage.setItem(LocalStorageType.RememberMe, remember);
        }
        this.dialogRef.closeAll();
        this.toastr.clear();
        return true;
      })
    );
  }

  public checkLogin(): boolean {
    const user: any = JSON.parse(
      localStorage.getItem(LocalStorageType.UserInformation)
    );
    return user;
  }

  getUserInformation(): UserInformationModel {
    return JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
  }

  public getCurrentLang(): string {
    return localStorage.getItem(LocalStorageType.CurrentLanguage)
      ? localStorage.getItem(LocalStorageType.CurrentLanguage)
      : "vi";
  }

  // permission
  public setPermissions(menuConfig: any[]) {
    const output = Array.from(menuConfig);
    output.forEach((val: any) => {
      if (val && val.actions && val.actions.length > 0) {
        val.actions.forEach((permission: any) => {
          this.addPermission(permission.action_id);
        });
      }
      if (val && val.children && val.children.length > 0) {
        this.setPermissions(val.children);
      }
    });
  }
  public getUrlFromId(id): string {
    let result = LeftMenuKeyConfig.filter((x) => x.menuId === id);
    return result.length > 0 ? result[0].url : "";
  }
  public setUrls(menuConfig: any[]) {
    const output = Array.from(menuConfig);
    output.forEach((val: any) => {
      if (val) {
        const url = this.getUrlFromId(val.menu_id);
        if (url !== "") {
          this.addPermissionUrl(url);
        }
        if (val.children && val.children.length > 0) {
          this.setUrls(val.children);
        }
      }
    });
  }
  public addPermissionResultToLocalStorage(permission: any, url: any) {
    localStorage.setItem(
      LocalStorageType.Permission,
      JSON.stringify(permission)
    );
    localStorage.setItem(LocalStorageType.PermissionUrl, JSON.stringify(url));
  }
  public checkPermission(permissionId: any) {
    const permissionList = JSON.parse(
      localStorage.getItem(LocalStorageType.Permission)
    );
    return permissionList?.filter((x) => x === permissionId).length > 0;
  }
  public checkPermissionUrl(permissionUrl: string) {
    if (permissionUrl === "" || permissionUrl === "/") {
      return true;
    } else {
      const permissionUrlList = JSON.parse(
        localStorage.getItem(LocalStorageType.PermissionUrl)
      );
      return (
        permissionUrlList?.filter((x: string) => permissionUrl.startsWith(x))
          .length > 0
      );
    }
  }
  public addPermission(permissionId: any) {
    this.permissionList.push(permissionId);
  }
  public addPermissionUrl(permissionUrl: any) {
    this.permissionUrl.push(permissionUrl);
  }

  setProduct(value: any) {
    this.isLoggedIn$.next(value);
  }
  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
