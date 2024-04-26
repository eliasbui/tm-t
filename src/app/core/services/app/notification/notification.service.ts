import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public isChangeInPage: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );
  public isChangeInPopup: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );
  public isReadInPopup: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );

  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
        this.config.config &&
        this.config.config.API_ENDPOINTS &&
        this.config.config.API_ENDPOINTS.REAL_API_URL_2
        ? this.config.config.API_ENDPOINTS.REAL_API_URL_2
        : '') + "/";
  }

  public getNotification(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/get-all`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getById(id): Observable<any> {
    const body = {
      id: id,
    };
    return this.http.post(`${this.baseUrl}notifications/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getNewestNotification(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/get-new`, body);
  }

  public markAllAsRead(): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/read-all`, {});
  }

  public markAsReadOrUnread(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/read`, body);
  }

  public delete(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/delete`, body);
  }

  // khi read/unread/delete ở page thì ảnh hưởng đến popup
  public getChangeInPage(): Observable<any> {
    return this.isChangeInPage.asObservable();
  }

  public setChangeInPage(data: any) {
    this.isChangeInPage.next(data);
  }

  // khi read ở popup thì ảnh hưởng đến page
  public getChangeInPopup(): Observable<any> {
    return this.isChangeInPopup.asObservable();
  }

  public setChangeInPopup(data: any) {
    this.isChangeInPopup.next(data);
  }

  // khi read ở popup thì thay đổi số lượng thông báo và navigate đến trang tương ứng
  public getReadInPopup(): Observable<any> {
    return this.isReadInPopup.asObservable();
  }

  public setReadInPopup(data: any) {
    this.isReadInPopup.next(data);
  }

  public getUrl(item) {
    let url = "";
    if (item.target === 'MERCHANT') {
      url = "admin/merchant/profile";
    }
    return url;
  }

}
