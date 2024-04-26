import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ConfigService } from '@core/services/configuration/configuration.service';

@Injectable({
  providedIn: "root",
})
export class DropdownDataService {
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
  getDropdownData(dataName: string) {
    const body = {
      key: dataName,
    };
    return this.http.post(`${this.baseUrl}/getlistbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getLocationData(key: string, id?: number): Observable<any> {
    const body: any = {
      key,
    };
    if (key !== "province" && id) {
      body.id = id;
    }
    return this.http.post(`${this.baseUrl}/common/address`, body);
  }

  getlistbox(dataName: string) {
    const body = {
      key: dataName,
    };
    return this.http.post(`${this.baseUrl}/getlistbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  getListMerchants() {
    const body = {};
    return this.http.post(`${this.baseUrl}/sub-merchant/listbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
