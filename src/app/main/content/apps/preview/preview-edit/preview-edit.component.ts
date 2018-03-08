import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleUsersTempApi } from '../../../../../core/sdk/services/index';
import { StoreApi } from '../../../../../core/sdk/services/index';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-preview-edit',
  templateUrl: './preview-edit.component.html',
  styleUrls: ['./preview-edit.component.scss']
})
export class PreviewEditComponent implements OnInit {
  rows: any[];
  rows2: any[];
  location_data: any[];
  editUser: FormGroup;
  franchiseId: any;
  formErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private membertemp: MultipleUsersTempApi,
    private StoreApi: StoreApi,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public dialogRef: MatDialogRef < PreviewEditComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formErrors = {
      email: {},
      first_name: {}


    };
  }

  ngOnInit() {
     
    this.franchiseId = localStorage.getItem('franchise_id');
    this.rows2=[];
var action = {};
if (localStorage.getItem('role_type') == "EX" || localStorage.getItem('role_type') == "D") {
      action = {
        where: {
          "franchise_id": this.franchiseId
        }

      }
    } else {
      action = {
        where: {
          "id": localStorage.getItem('store_id')
        }

      }
    }

    this.StoreApi.find(action).subscribe((resp) => {
      this.rows2 = resp;

    })

    this.editUser = this.formBuilder.group({
      Name: [this.data.memberdetails.Name, [Validators.required]],
      email: [this.data.memberdetails.email, [Validators.required]],
      Location: [this.data.memberdetails.Location, [Validators.required]],
      Designation: [this.data.memberdetails.Designation, [Validators.required]],
      UDA: [this.data.memberdetails.UDA, [Validators.required]],
      franchise_id: [this.data.memberdetails.franchise_id, [Validators.required]],
      role_id: [this.data.memberdetails.role_id, [Validators.required]],
      created_by: [this.data.memberdetails.created_by, [Validators.required]],
      created_by_role_id: [this.data.memberdetails.created_by_role_id, [Validators.required]]

    });
  }

  onSubmit() {
    this.editUser.value.password = this.data.memberdetails.UDA;
    this.editUser.value.Email = this.editUser.value.email;
    this.membertemp.patchAttributes(this.data.memberdetails.id, this.editUser.value)
      .subscribe(
        data => {
          this.snackBar.open("Edited successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);
        },
        error => {

          this.snackBar.open(this.editUser.value.email+ " already exists", "", {
            duration: 3000,
          });
          this.dialogRef.close();
        }
      );
  }


}
