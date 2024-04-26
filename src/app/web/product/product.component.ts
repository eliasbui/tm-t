import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstants } from "@core/constants";
import { CategoryService } from "@core/services/app/category/category.service";
import { ProductService } from "@core/services/app/product/product.service";

@Component({
  selector: "ite-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public url = "/product";
  public dataCate: any;
  public dataProduct: any;
  public page: number = CommonConstants.DEFAULT_PAGE_INDEX;
  public pageSize: number = CommonConstants.DEFAULT_PAGE_SIZE;
  public searchRequest: any = {};
  public pageSizes = CommonConstants.DEFAULT_PAGE_SIZE_OPTION;
  public loading = true;
  public total: number;
  public keyWord: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyWord = params['keyWord'];
      this.initialData();
    });

    this.categoryService.getAll().subscribe((data) => {
      this.dataCate = data;
    });
  }

  changePage(page) {
    if (this.page !== page) {
      this.page = page;
      this.searchRequest.page = this.page;
      this.searchRequest.size = this.pageSize;
      this.router.navigate([this.url], {
        queryParams: this.searchRequest,
      });
      this.getList();
    }
  }
  onPageSizeChange(pSize) {
    this.page = 1;
    this.searchRequest.page = this.page;
    this.searchRequest.size = pSize;
    this.router.navigate([this.url], {
      queryParams: this.searchRequest,
    });
    this.getList();
  }

  getList() {
    this.loading = true;
    if (this.keyWord) {
      this.searchRequest.page = this.page;
      this.searchRequest.size = this.pageSize;
      this.searchRequest.keyWord = this.keyWord;
      this.productService
        .searchProduct(this.searchRequest)
        .subscribe((data) => {
          this.dataProduct = data.products;
          this.total = data.totalRecords;
          this.loading = false;
        });
    } else {
      this.searchRequest.page = this.page;
      this.searchRequest.size = this.pageSize;
      this.productService.getAll(this.searchRequest).subscribe((data) => {
        this.dataProduct = data.products;
        this.total = data.totalRecords;
        this.loading = false;
      });
    }
  }

  initialData() {
    this.getList();
  }

  onChangeCate(value) {
    this.searchRequest.categoryId = value;
    this.searchRequest.page = 1;
    this.getList();
  }
  
  detail(id) {
    this.router.navigate([`/product/detail/${id}`]);
  }
}
