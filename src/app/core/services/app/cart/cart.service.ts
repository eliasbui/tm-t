import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageType } from "@core/constants";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.REAL_API_URL
        ? this.config.config.API_ENDPOINTS.REAL_API_URL
        : "";
  }

  addToCart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/ecommerce/cart/add-to-cart`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getCartDetailByUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ecommerce/cart/my-cart`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  updateProductCartById(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/ecommerce/cart/update`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  removeProductCartById(id): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/ecommerce/cart/delete-product?productId=${id}`)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  autoAddToCart(dataCartLocal) {
    if (dataCartLocal && dataCartLocal.length > 0) {
      dataCartLocal.forEach((item) => {
        const body = {
          productId: item.productId,
          quantity: item.quantity,
        };
        this.addToCart(body).subscribe((data) => {});
      });
      localStorage.removeItem(LocalStorageType.Cart);
    }
  }
}
