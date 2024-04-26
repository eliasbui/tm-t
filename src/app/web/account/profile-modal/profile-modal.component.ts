import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from '@core/components/reset-password/custom-validators';
import { CommonErrorCode, LocalStorageType } from '@core/constants';
import { LocalizeService } from '@core/localization';
import { UserInformationModel } from '@core/models';
import { BackgroundLoader, ProfileService, ProfileShare } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { FormValidators } from 'src/app/shared/validators';

@Component({
  selector: 'ite-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {
  public user: any;
  public profileForm: FormGroup;
  public isLoading: boolean;
  public commonErrorCode = CommonErrorCode;
  public languageList = [];
  @ViewChild("phone") phone;

  constructor(
    public dialogRef: MatDialogRef<ProfileModalComponent>,
    private localizeService: LocalizeService,
    private profileService: ProfileService,
    private loader: BackgroundLoader,
    private toastService: ToastrService,
    private fb: FormBuilder,
    private profile: ProfileShare,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.data?.profile;
    this.languageList = this.data?.langs;
  }
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: this.fb.control("", [
        Validators.required,
        FormValidators.nameSpace,
        CustomValidators.patternValidator(/[^!@#$%^&*()_+\-={};':"|,.<>?]/, {
          hasSpecialCharacters: true,
        }),
      ]),
      phone: this.fb.control({ value: "", disabled: true }),
      email: this.fb.control({ value: "", disabled: true }),
      full_name: this.fb.control({ value: "" }),
    });
    if (Object.keys(this.user).length > 0) {
      this.profileForm.patchValue(this.user);
    }
  }

  get f() {
    return this.profileForm.controls;
  }
  trimData(e) {
    e.target.value = e.target.value.trim();
  }
  getUserInformation(): UserInformationModel {
    return JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
  }
  cancel(isSuccess) {
    this.dialogRef.close(isSuccess);
  }

  public onSubmit() {
    if (this.profileForm.valid) {
      this.profileService
        .updateProfile(this.profileForm.value)
        .subscribe((result) => {
          if (result.code === "00") {
            this.cancel(true);
            const message = this.localizeService.instant(
              "profileAccount.validator.success"
            );
            const currentUser = this.getUserInformation();
            if (currentUser) {
              this.profile.setProfileInfo(
                this.profileForm.value.name,
                currentUser.thumbnailPhoto
              );
              currentUser.displayName = this.profileForm.value.name;
              localStorage.setItem(
                LocalStorageType.UserInformation,
                JSON.stringify(currentUser)
              );
            }
            this.toastService.success(message);
          } else if (result.error_code === "11") {
            this.f.phone.setErrors({ exist: true });
            this.phone.nativeElement.focus();
          } else {
            this.toastService.error(result.error_message);
          }
        });
    }
  }

  enter($event) {
    this.profileForm.markAllAsTouched();
    this.onSubmit();
    $event.preventDefault();
  }

}
