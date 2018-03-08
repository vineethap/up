import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import { MultipleUsersTempApi } from '../../../../../core/sdk/services/index';


@Component({
  selector: 'app-preview-delete',
  templateUrl: './preview-delete.component.html',
  styleUrls: ['./preview-delete.component.scss']
})
export class PreviewDeleteComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private MultipleUsersTempApi: MultipleUsersTempApi,
    public dialogRef: MatDialogRef < PreviewDeleteComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

  }


  onSubmit(user) {

    this.MultipleUsersTempApi.deleteById(user.id)
      .subscribe(
        data => {

          this.snackBar.open("Deleted Successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);
        },
        error => {

          this.snackBar.open("Some error occured", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );

  }

}
