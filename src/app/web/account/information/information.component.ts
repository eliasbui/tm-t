import { Component, OnInit } from '@angular/core';
import { LocalStorageType } from '@core/constants';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'ite-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  public user: any;
  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
    console.log(this.user);
  }
  public editProfile(): void {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: "400px",
      disableClose: true,
      data: {
        profile: this.user,
        // langs: this.langs,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this.getDetailProfile();
      //   this.getHistory(1);
      // }
    });
  }

  
  public openChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "400px",
      disableClose: true,
      data: { userId: 15 },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
