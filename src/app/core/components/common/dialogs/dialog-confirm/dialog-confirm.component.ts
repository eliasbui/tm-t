import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'ite-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  public message:string;
  public confirm:string;
  public title:string;
  constructor( public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.message = this.data.message;
      this.title = this.data.title;
      this.confirm = this.data.confirm;
    }
    onYesClick(){
      this.data.yes();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }


}
