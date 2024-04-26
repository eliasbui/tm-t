import { AfterViewInit, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonErrorCode, LocalStorageType, langSettings } from "@core/constants";
import { AuthenticationAndAuthorizationService, BackgroundLoader, BrowserAndLocationInformationService } from "@core/services";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password");
  const confirm = control.get("confirmPassword");
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: "ite-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  public showPw = false;
  public showCfPw = false;
  public isChecked = false;
  public langSetting = langSettings;
  public submitted = false;
  public error_message = "";
  public commonErrorCode = CommonErrorCode;
  public flag: string;
  model: any = {};
  public registerForm: FormGroup;
  returnUrl;
  currentErrorCode = "";
  keyLoginAuto = "";
  ngAfterViewInit(): void {
    this.loader.hide();
  }
  emailRegex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex: RegExp = /^(?:(?:\+|0{0,2})84|0[3|5|7|8|9]|84)(?:\d{8}|(\d{7}))+$/;
  passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]).{8,20}$/;
  constructor(
    private loader: BackgroundLoader,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationAndAuthorizationService,
    protected browserInfoService: BrowserAndLocationInformationService,
    public fb: FormBuilder,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || "/";
    this.registerForm = this.fb.group(
      {
        fullName: ["", Validators.required],
        email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
        phoneNumber: ["", [Validators.required, Validators.pattern(this.phoneRegex)]],
        password: ["", [Validators.required, Validators.pattern(this.passwordRegex)]],
        confirmPassword: ["", Validators.required],
      },
      { validator: confirmPasswordValidator }
    );
  }

  ngOnInit() {
  }
  register() {
    //this.route.navigate(['forgot-password']);
  }
  redirect() {
    this.route.navigate(["forgot-password"]);
  }

  changeLang(lang: string) {
    localStorage.setItem(LocalStorageType.LoginLanguage, lang);
    this.flag = this.getLangSetting(lang).flag;
    this.translate.use(lang);
  }
  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }

  togglePw() {
    this.showPw = !this.showPw;
    if (this.showPw) {
      setTimeout(() => {
        this.showPw = false;
      }, 2000);
    }
  }
  toggleCfPw() {
    this.showCfPw = !this.showCfPw;
    if (this.showCfPw) {
      setTimeout(() => {
        this.showCfPw = false;
      }, 2000);
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  }

  isLoginBefore() {
    let isLogged;
    this.activatedRoute.queryParams.subscribe((data) => {
      if (Object.keys(data).length > 0) {
        if (data?.key !== "") {
          isLogged = true;
          this.keyLoginAuto = data.key;
        } else {
          isLogged = false;
          this.keyLoginAuto = "";
        }
      }
    });

    return isLogged;
  }
  isFieldInvalid(field: string) {
    const control = this.registerForm.get(field);
    return control.invalid && (control.dirty || control.touched || this.submitted);
  }
  
}
