import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { StoreApi } from '../../../../../core/sdk/services/index';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import * as _ from "lodash";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


  rows: any[];
  rows2: any[];
  editUser: FormGroup;
  franchiseId: any;
  formErrors: any;
  new_file_name: any;


  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    private franchise: FranchiseApi,
    private StoreApi: StoreApi,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public dialogRef: MatDialogRef < EditUserComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formErrors = {

      email: {},
      first_name: {}


    };
  }

  ngOnInit() {
    var action = {};
    this.franchiseId = localStorage.getItem('franchise_id');

    this.editUser = this.formBuilder.group({
      first_name: [this.data.memberdetails.first_name, [Validators.required]],
      email: [this.data.memberdetails.email, [Validators.required]],
      store_id: [this.data.memberdetails.store_id, [Validators.required]],
      designation: [this.data.memberdetails.designation, [Validators.required]],
      role: [this.data.memberdetails.role, [Validators.required]],
      UDA: [this.data.memberdetails.UDA, [Validators.required]],
      franchise_id: [this.data.memberdetails.franchise_id, [Validators.required]],
      role_id: [this.data.memberdetails.role_id, [Validators.required]],
      created_by_role_id: [this.data.memberdetails.created_by_role_id, [Validators.required]],
      created_by: [this.data.memberdetails.created_by, [Validators.required]]


    });
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
  }

  onSubmit() {
    this.editUser.value.password = this.data.memberdetails.UDA;
    this.member.patchAttributes(this.data.memberdetails.id, this.editUser.value)
      .subscribe(
        data => {
          this.snackBar.open("Edited Successfully", "", {
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

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

}
