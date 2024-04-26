import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonConstants, LocalStorageType, langSettings } from "@core/constants";
import { AuthenticationAndAuthorizationService } from "@core/services";
import { ProductService } from "@core/services/app/product/product.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ite-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() key: boolean;
  category: any[] = [];
  public flag: string;
  public langSetting = langSettings;
  public langName: string;
  public langCode = "vi";
  public openMenu: boolean = false;
  public userInformation: any;
  public token: string;
  public isLoggedIn: boolean = false;
  public page: number = CommonConstants.DEFAULT_PAGE_INDEX;
  public pageSize: number = CommonConstants.DEFAULT_PAGE_SIZE;
  public searchForm: FormGroup;

  constructor(
    public translate: TranslateService,
    public authService: AuthenticationAndAuthorizationService,
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private router: Router
  ) {
    this.userInformation = localStorage.getItem(
      LocalStorageType.UserInformation
    );
    this.token = localStorage.getItem(LocalStorageType.Token);
    this.searchForm = this.fb.group({
      search: [""],
    });
  }

  ngOnInit(): void {
    this.flag = this.getLangSetting(this.authService.getCurrentLang()).flag;
    this.langName = this.getLangSetting(
      this.authService.getCurrentLang()
    ).lang_name;
    this.checkLogin();
    this.authService.selectedIsLoggedIn$.subscribe((value) => {
      this.checkLogin();
    });
  }

  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }
  changeLang(lang: string) {
    this.langCode = lang;
    this.flag = this.getLangSetting(this.langCode).flag;
    this.langName = this.getLangSetting(this.langCode).lang_name;
    this.translate.use(lang);
    localStorage.setItem(LocalStorageType.CurrentLanguage, this.langCode);
  }

  public openMenuFalse(): void {
    this.openMenu = false;
  }
  public openMenuTrue(): void {
    this.openMenu = true;
    this.cdr.detectChanges();
  }
  public checkLogin() {
    this.userInformation = localStorage.getItem(
      LocalStorageType.UserInformation
    );
    this.token = localStorage.getItem(LocalStorageType.Token);
    if (this.userInformation && this.token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logOut(): void {
    this.authService.logOut().subscribe((val: any) => {
      if (val) {
        this.router.navigate(["login"]);
      }
    });
  }
  cart() {
    this.router.navigate(["/cart"]);
  }

  search() {
    this.router.navigateByUrl(`product?keyWord=${this.searchForm.value.search}`);
  }
}
