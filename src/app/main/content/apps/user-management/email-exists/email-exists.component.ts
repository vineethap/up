import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-email-exists',
  templateUrl: './email-exists.component.html',
  styleUrls: ['./email-exists.component.scss']
})
export class EmailExistsComponent implements OnInit {
  flag = false;
  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef < EmailExistsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    if (this.data.location) {
      this.data.location.forEach((loc) => {

        if (loc.Location == "") {
          this.flag = true;
        }
      });

    }

  }

}
