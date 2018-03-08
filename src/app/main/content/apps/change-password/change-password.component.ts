import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberApi } from '../../../../core/sdk/services/index';
import { FranchiseApi } from '../../../../core/sdk/services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  formErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    private franchise: FranchiseApi,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef < ChangePasswordComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formErrors = {
      oldPassword: {},
      newPassword: {},
      confirmPassword: {}

    };
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]

    });

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }
  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.changePasswordForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  changePassword() {
    if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmPassword) {
      if (localStorage.getItem('userType') == "Franchise") {
        this.franchise.changePassword(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword)
          .subscribe(
            data => {
              this.openSnackBar('Password changed successfully!.');
              this.dialogRef.close();
            },
            error => {
              this.openSnackBar(error.message);
              this.dialogRef.close();
            });
      } else {
        this.member.changePassword(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword)
          .subscribe(
            data => {
              this.openSnackBar('Password changed successfully!.');
              this.dialogRef.close();
            },
            error => {
              this.openSnackBar(error.message);
              this.dialogRef.close();
            });
      }
    } else {
      this.openSnackBar("Password Mismatch");

    }
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, "", {
      duration: 2000,
    });
  }

}
