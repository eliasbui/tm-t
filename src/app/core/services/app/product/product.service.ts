import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  getAll(body: any): Observable<any> {
    let url = `${this.baseUrl}/ecommerce/products?page=${body.page - 1 }&size=${body.size}`;
    if(body.categoryId){
      url += `&categoryId=${body.categoryId}`;
    }
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  getById(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/ecommerce/products/detail?productId=${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  

  searchProduct(body): Observable<any> {
    body.page = body.page - 1;
    return this.http.post(`${this.baseUrl}/ecommerce/products/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
