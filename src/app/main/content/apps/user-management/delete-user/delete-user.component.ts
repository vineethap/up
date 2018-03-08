import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule,MatSnackBar } from '@angular/material';
import { MemberApi } from '../../../../../core/sdk/services/index';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private member: MemberApi,
    public dialogRef: MatDialogRef < DeleteUserComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}


  onSubmit(user) {
    this.member.deleteById(user.id)
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
