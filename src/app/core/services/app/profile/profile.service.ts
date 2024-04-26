import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  ProfileResponse,
  ProfileRequest,
  ProfilePassword,
} from "@core/models/App/profile/profile.model";
import { map } from "rxjs/operators";
import { Md5Help } from "@core/helper";
import { ConfigService } from '@core/services/configuration/configuration.service';

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  baseUrl = "";
  baseUrl2 = "";
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.baseUrl =
      (this.config &&
        this.config.config &&
        this.config.config.API_ENDPOINTS &&
        this.config.config.API_ENDPOINTS.REAL_API_URL_2
        ? this.config.config.API_ENDPOINTS.REAL_API_URL_2
        : '');
    this.baseUrl2 =
      (this.config &&
        this.config.config &&
        this.config.config.API_ENDPOINTS &&
        this.config.config.API_ENDPOINTS.REAL_API_URL
        ? this.config.config.API_ENDPOINTS.REAL_API_URL
        : '');
  }

  detailProfile(): Observable<ProfileResponse> {
    return this.http
      .post<ProfileResponse>(`${this.baseUrl}/account/detail`, {})
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updateProfile(request: ProfileRequest): Observable<ProfileResponse> {
    var data = {
      data: {
        fullname: request.fullname,
        phone: request.phone,
        language: request.language == "vi" ? "vn" : request.language,
      },
    };
    return this.http.post<ProfileResponse>(
      `${this.baseUrl}/account/profile/edit`,
      data
    );
  }

  updatePassword(request: ProfilePassword): Observable<ProfileResponse> {
    var body = {
      old_password: Md5Help.md5(request.old_password),
      new_password: Md5Help.md5(request.new_password),
    };
    return this.http.post<ProfileResponse>(
      `${this.baseUrl}/account/profile/update-password`,
      body
    );
  }

  getLanguageList(): Observable<any> {
    const body = {
      key: "language",
    };
    return this.http.post(`${this.baseUrl}/getlistbox`, body).pipe(
      map((data: any) => {
        if (data.list_data) {
          data.list_data.map((i) => (i.des = "languageList." + i.des));
        }
        return data;
      })
    );
  }

  getActivityHistory(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/actions`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  confirmResetPws(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}/forgot-password`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  confirmNewPassWord(body: any): Observable<any> {
    let input = {
      ref_id: body.ref_id,
      otp: Md5Help.md5(body.otp),
      new_password: Md5Help.md5(body.new_password),
    };
    return this.http.post(`${this.baseUrl2}/confirm-password`, input).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
