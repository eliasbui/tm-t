import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from '@core/services/configuration/configuration.service';
@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "";
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
  }

  getUser(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getById(id: string): Observable<any> {
    const body: any = {
      user_id: Number(id),
    };
    return this.http.post(`${this.baseUrl}/user/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateUser(request: any): Observable<any> {
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}/user/edit`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addNewUser(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/addnew`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  approveUser(userId: any): Observable<any> {
    const body = {
      user_id: userId,
    };
    return this.http.post(`${this.baseUrl}/user/approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  activeUser(request: any): Observable<any> {
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}/user/change-status`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  resetPassword(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/reset-password`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  changeAvatar(file: File, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http
      .post(`${this.baseUrl}/profile/edit-avatar`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getRoleByMerchant(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/get-role`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
