import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { StoreApi } from '../../../../../core/sdk/services/index';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { RolesApi } from '../../../../../core/sdk/services/index';
import { Observable } from 'rxjs/Rx';
import { EmailExistsComponent } from '../email-exists/email-exists.component';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import * as _ from "lodash";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  role_data: any[];
  created_by_role_id: any;
  role_id: any;
  rows: any[];
  rows2: any[];
  arraylist: any;
  franchiseId: any;
  userId: any;
  dialogRef1: any;
  public adduser: any = {};
  newUser: FormGroup;
  formErrors: any;
  new_file_name: any;
  createdata = false;

  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    private StoreApi: StoreApi,
    private franchise: FranchiseApi,
    private roles: RolesApi,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef < AddUserComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formErrors = {
      first_name: {},
      email: {}

    };
  }

  ngOnInit() {
    var action = {};
    this.franchiseId = localStorage.getItem('franchise_id');
    this.userId = localStorage.getItem('user_id');
    this.newUser = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()])

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
    this.findRoleData();



  }
  findRoleData() {
    this.roles.findOne({
      where: {
        role: "Employee"
      }
    }).subscribe((role) => {
      var employee_role = JSON.parse(JSON.stringify(role));
      this.role_id = employee_role.id;
    }, (error) => {
      console.log("Server error");
    });
  }

  initItemRows() {
    var emailValidation= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailValidation)]],
      first_name: ['', Validators.required],
      location: [''],
      designation: [''],
      // franchise_id: [''],
      password: ['']
    });
  }
  addNewRow() {
    const control = < FormArray > this.newUser.controls['itemRows'];
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = < FormArray > this.newUser.controls['itemRows'];
    control.removeAt(index);
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


  createUser() {
    const control = < FormArray > this.newUser.controls['itemRows'];
    this.arraylist = []
    let array = control.value;
    this.checkUserCount(array.length, array);
  }

  checkUserCount(new_user, array) {
    this.franchise.findOne({
      where: {
        "id": this.franchiseId
      }

    }).subscribe((resp) => {
      var _d = JSON.parse(JSON.stringify(resp));


      this.member.find({
        where: {
          "franchise_id": this.franchiseId
        }

      }).subscribe((response) => {

        // console.log(_d.payment_details.users_purchased, response.length, new_user);
        if (response.length < _d.payment_details.users_purchased) {
          if ((new_user + response.length) <= _d.payment_details.users_purchased) {
            for (var value of array) {

              var chars = "abcdefghijklmnopqrstuvwxyz@#$&ABCDEFGHIJKLMNOP1234567890";
              var pass = "";
              for (var x = 0; x < 5; x++) {
                var i = Math.floor(Math.random() * chars.length);
                pass += chars.charAt(i);
              }
              pass = "upfront" + pass;

              this.arraylist.push({
                first_name: value.first_name,
                password: pass,
                UDA: pass,
                email: value.email,
                store_id: value.location,
                designation: value.designation,
                franchise_id: this.franchiseId,
                role_id: this.role_id,
                created_by_role_id: localStorage.getItem('role_id'),
                created_by: this.userId

              })
            }

            this.checkemail(this.arraylist, value.email);

          } else {
            var text = "";
            var diff = ((new_user + response.length) - _d.payment_details.users_purchased);
            if (diff == 1) {
              text = "user";
            } else {
              text = "users";
            }
            this.snackBar.open('Count exceeded.Please remove ' + diff + ' ' + text + ' to proceed!', '', {
              duration: 4000
            });

          }
        } else {
          var diff = ((new_user + response.length) - _d.payment_details.users_purchased);
          if (diff == 1) {
            text = "user";
          } else {
            text = "users";
          }
          this.snackBar.open('Count exceeded.Please remove ' + diff + ' ' + text + ' to proceed!', '', {
            duration: 4000
          });

        }

      })
    })
  }

  checkemail(newdata, email_new) {
    this.member.validateEmail({
      email: email_new
    }).subscribe((d) => {


      if (d.status == true) {

        this.member.create(newdata)
          .subscribe(
            (data) => {

              this.snackBar.open('Successfully Created ', '', {
                duration: 2000
              });
              this.dialogRef.close(data);

            }, (error) => {

              this.snackBar.open(email_new + ' already exists!', '', {
                duration: 2000
              });
              this.dialogRef.close();
            });

      } else {
        this.snackBar.open(email_new + ' already exists', '', {
          duration: 2000
        });
      }
    }, (error) => {
      this.snackBar.open('Something went wrong !', '', {
        duration: 2000
      });

    });
  }

}
