import { async, TestBed } from "@angular/core/testing";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BackgroundLoader } from "@core/services";
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { MaterialModule } from "src/app/shared/shared/material.module";
import {
  mockDialogRef,
  MatDialogMock,
} from "src/app/shared/mockData/MockDialog";
import { ResetPasswordComponent } from "./reset-password.component";
import { FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocalStorageType } from "@core/constants";
import { of } from "rxjs";
import { LoginComponent } from '../login/login.component';
import { Router } from "@angular/router";
import { MockRouterValue } from "src/app/shared/mockData/mockCommon";

describe("Reset Password Component", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
            deps: [HttpClient],
          },
        }),
        MaterialModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [ResetPasswordComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        BackgroundLoader,
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        FormBuilder,
        {
          provide: Router,
          useValue: MockRouterValue(),
        },
      ],
    }).compileComponents();
  }));

  it("should create the app ", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue("en")
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify(null));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.profileService, "confirmResetPws").and.returnValue(
      of({
        error_code: "11",
        ref_id: "001",
      })
    );
    app.getOTP();
    expect(app).toBeTruthy();
  });
  it("should create the app ", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue("en")
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify(null));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.profileService, "confirmResetPws").and.returnValue(
      of({
        error_code: "02",
        ref_id: "001",
      })
    );
    app.getOTP();
    expect(app).toBeTruthy();
  });
  it("should create the app ", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue("en")
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify(null));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.profileService, "confirmResetPws").and.returnValue(
      of({
        error_code: "00",
        ref_id: "001",
      })
    );
    app.getOTP();
    expect(app).toBeTruthy();
  });
  it("should create the app with no default lang", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue(undefined)
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify({ val: 'abc' }));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, 'confirmNewPassWord').and.returnValue(
      of({
        error_code: '00'
      })
    )
    fixture.detectChanges();
    app.clearForm();
    const rightEvent = {
      keycode: 8,
      target: {
        value: 'Abc@123423'
      }
    }
    const wrongEvent = {
      keycode: 8,
      target: {
        value: ''
      }
    }
    app.checkValue(wrongEvent);
    app.checkValue(rightEvent);

    app.f['new_password'].setValue('abc@1234!A')
    app.f['confirm_password'].setValue('abc@1234!A')
    app.f['otp'].setValue('abc@1234!A');
    app.updateNewPasswords();
    expect(app).toBeTruthy();
  });
  it("should create the app with no default lang", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue(undefined)
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify({ val: 'abc' }));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, 'confirmNewPassWord').and.returnValue(
      of({
        error_code: '01'
      })
    )
    fixture.detectChanges();
    const rightEvent = {
      keycode: 8,
      target: {
        value: 'Abc@123423'
      }
    }
    app.checkValue(rightEvent);

    app.f['new_password'].setValue('abc@1234!A')
    app.f['confirm_password'].setValue('abc@1234!A')
    app.f['otp'].setValue('abc@1234!A');
    app.updateNewPasswords();
    expect(app).toBeTruthy();
  });
  it("should create the app with no default lang", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue(undefined)
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify({ val: 'abc' }));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, 'confirmNewPassWord').and.returnValue(
      of({
        error_code: '01'
      })
    )
    fixture.detectChanges();
    app.clearForm();
    const rightEvent = {
      keycode: 8,
      target: {
        value: 'Abc@123'
      }
    }
    app.checkValue(rightEvent);

    app.f['new_password'].setValue('abc@1234!A')
    app.f['confirm_password'].setValue('abc@1234!A')
    app.f['otp'].setValue('abc@1234!A');
    app.updateNewPasswords();
    expect(app).toBeTruthy();
  });
  it("should create the app with no default lang", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue(undefined)
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify(null));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, 'confirmNewPassWord').and.returnValue(
      of({
        error_code: '01'
      })
    )
    fixture.detectChanges();
    app.clearForm();
    const rightEvent = {
      keycode: 8,
      target: {
        value: 'Abc@1234'
      }
    }
    app.checkValue(rightEvent);

    app.f['new_password'].setValue('abc@1234!A')
    app.f['confirm_password'].setValue('abc@1234!A');
    app.f['otp'].setValue('abc@1234!A');
    app.updateNewPasswords();
    expect(app).toBeTruthy();
  });
  it("should create the app with no default lang", () => {
    spyOn(localStorage, "getItem")
      .withArgs(LocalStorageType.LoginLanguage)
      .and.returnValue(undefined)
      .withArgs(LocalStorageType.OTP)
      .and.returnValue(JSON.stringify(null));
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.profileService, 'confirmNewPassWord').and.returnValue(
      of({
        error_code: '01'
      })
    )
    fixture.detectChanges();
    app.clearForm();
    const rightEvent = {
      keycode: 8,
      target: {
        value: 'Abc@1234'
      }
    }
    app.f['new_password'].setValue('abc@1!A')
    app.f['confirm_password'].setValue('abc@1234!A');
    app.f['otp'].setValue('abc@1234!A');
    app.checkValue(rightEvent);
    app.updateNewPasswords();
    expect(app).toBeTruthy();
  });
});
