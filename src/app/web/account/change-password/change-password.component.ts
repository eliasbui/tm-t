import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageType } from '@core/constants';
import { StrengthPassword } from '@core/helper';
import { AuthenticationAndAuthorizationService, BackgroundLoader, ProfileService } from '@core/services';
import { ConfigService } from '@core/services/configuration/configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormValidators } from 'src/app/shared/validators';

@Component({
  selector: 'ite-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public isOldPassword = false;
  public errorList: any = {
    isMinValid: false,
    isUpper: false,
    isLower: false,
    isSpecial: false,
    isNumber: false,
    isUtf8: false,
  };

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private profileService: ProfileService,
    private toastService: ToastrService,
    private loader: BackgroundLoader,
    private authService: AuthenticationAndAuthorizationService,
    private router: Router,
    private translateService: TranslateService,
    private config: ConfigService,
    private toastr: ToastrService,
    
  ) {}

  ngOnInit() {
    const currentPassword = new FormControl("", [Validators.required]);

    const password = new FormControl("", [
      Validators.required,
      // ,
      // FormValidators.passwordStrength
    ]);

    const confirmPassword = new FormControl("", [
      Validators.required,
      FormValidators.equalTo(password),
    ]);

    this.changePasswordForm = new FormGroup({
      currentPassword: currentPassword,
      password: password,
      confirmPassword: confirmPassword,
    });
  }
  get f() {
    return this.changePasswordForm.controls;
  }
  checkValue(e) {
    if (e.keycode === 8) {
      this.errorList = StrengthPassword.checkStrengthPassword(e.target.value);
    }
    if (e.target.value?.trim() !== "") {
      this.errorList = StrengthPassword.checkStrengthPassword(e.target.value);
    } else {
      this.errorList.isMinValid =
        this.errorList.isNumber =
        this.errorList.isSpecial =
        this.errorList.isUpper =
        this.errorList.isLower =
        this.errorList.isUtf8 =
          false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public onUpdate() {
    if (this.changePasswordForm.invalid) {
      return false;
    }
    if (
      !this.errorList.isMinValid ||
      !this.errorList.isNumber ||
      !this.errorList.isSpecial ||
      !this.errorList.isUpper ||
      !this.errorList.isLower ||
      !this.errorList.isUtf8
    ) {
      return;
    }
    const request: any = {
      oldPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.password,
      reNewPassword: this.changePasswordForm.value.confirmPassword,
    };

    this.profileService.updatePassword(request).subscribe(
      (data) => {
        this.cancel(true);
        localStorage.clear();
        this.toastr.clear();
        let remember = null;
        if (localStorage.getItem(LocalStorageType.RememberMe)) {
          remember = localStorage.getItem(LocalStorageType.RememberMe);
        }
        localStorage.clear();
        if (remember != null) {
          localStorage.setItem(LocalStorageType.RememberMe, remember);
        }
      },
      (error) => {
        this.isOldPassword = true;
        this.f.currentPassword.setErrors({ incorrect: true });
        return false;
      }
    );
  }

  cancel(isSuccess) {
    this.dialogRef.close(isSuccess);
  }

  getTranslation(key) {
    let translation = "";
    this.translateService.get(key).subscribe((data) => {
      translation = data;
    });
    return translation;
  }

  onKeydown(event) {
    const k = event.keyCode;
    if (k === 32) {
      event.preventDefault();
    }
  }

}
