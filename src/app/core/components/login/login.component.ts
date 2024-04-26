import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CommonErrorCode,
  LocalStorageType,
  langSettings,
} from "@core/constants";
import {
  AuthenticationAndAuthorizationService,
  BackgroundLoader,
  BrowserAndLocationInformationService,
  CartService,
} from "@core/services";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
@Component({
  selector: "ite-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() key: EventEmitter<boolean> = new EventEmitter();
  public showPw = false;
  public isChecked = false;
  public langSetting = langSettings;
  public submitted = false;
  public error_message = "";
  public commonErrorCode = CommonErrorCode;
  public flag: string;
  model: any = {};
  public loginForm: FormGroup;
  returnUrl;
  currentErrorCode = "";
  keyLoginAuto = "";
  ngAfterViewInit(): void {
    this.loader.hide();
  }

  constructor(
    private loader: BackgroundLoader,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationAndAuthorizationService,
    protected browserInfoService: BrowserAndLocationInformationService,
    public fb: FormBuilder,
    private cartService: CartService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || "/";
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember_me: [""],
    });
    if (localStorage.getItem(LocalStorageType.RememberMe)) {
      let jsonObject = JSON.parse(
        localStorage.getItem(LocalStorageType.RememberMe)
      );
      this.isChecked = true;
      this.loginForm.patchValue({
        username: jsonObject.acc,
        password: jsonObject.pass,
        remember_me: this.isChecked,
      });
    }
  }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      this.route.navigateByUrl("home");
      return;
    }
    this.authService.logOut();
  }
  redirect() {
    this.route.navigate(["forgot-password"]);
  }
  saveInfoRemember(isChecked: boolean = false) {
    if (isChecked) {
      let inforRemember = {
        acc: this.loginForm.value.username,
        pass: this.loginForm.value.password,
      };
      localStorage.setItem(
        LocalStorageType.RememberMe,
        JSON.stringify(inforRemember)
      );
      return;
    }
    localStorage.removeItem(LocalStorageType.RememberMe);
    return;
  }
  togglePw() {
    this.showPw = !this.showPw;
    if (this.showPw) {
      setTimeout(() => {
        this.showPw = false;
      }, 2000);
    }
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error_message = "";
    if (this.loginForm.invalid) {
      return;
    }
    const form = this.loginForm.value;
    this.authService
      .doLogin(form.username.trim(), form.password.trim())
      .subscribe(
        (data: any) => {
          this.loader.hide();
          this.saveInfoRemember(this.loginForm.value.remember_me);
          const currentTime = moment().toDate().getTime();
          localStorage.setItem(
            LocalStorageType.LastLoginDate,
            String(currentTime)
          );
          this.key.emit(true);
        const dataCartLocal = JSON.parse(
            localStorage.getItem(LocalStorageType.Cart)
          ) || [];
          if (dataCartLocal && dataCartLocal.length > 0) {
            this.cartService.autoAddToCart(dataCartLocal);
          }
          this.route.navigate(["/"]);
        },
        (error) => {
          this.error_message = this.translate.instant(
            `error_code.login.error_${error.error.error_code}`
          );
          this.currentErrorCode = `error_code.login.error_${error.error.error_code}`;
        }
      );
  }
  enter($event) {
    this.loginForm.markAllAsTouched();
    this.onSubmit();
    $event.preventDefault();
  }
}
