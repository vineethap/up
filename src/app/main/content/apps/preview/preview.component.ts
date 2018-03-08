import { MultipleUsersTempApi } from '../../../../core/sdk/services/index';
import { MemberApi } from '../../../../core/sdk/services/index';
import { FranchiseApi } from '../../../../core/sdk/services/index';
import { StoreApi } from '../../../../core/sdk/services/index';
import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreviewEditComponent } from './preview-edit/preview-edit.component';
import { PreviewDeleteComponent } from './preview-delete/preview-delete.component';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailExistsComponent } from '../user-management/email-exists/email-exists.component';



@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  rows: any[];
  rows2: any[];
  location: any[];
  dialogRef: any;
  franchiseId: any;
  _params: any;
  already_exists = false;
  constructor(
    private multipleuser: MultipleUsersTempApi,
    private member: MemberApi,
    private franchise: FranchiseApi,
    private StoreApi: StoreApi,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._params = params['name'];

    })
    this.franchiseId = localStorage.getItem('franchise_id');

    this.multipleuser.find({
      "where": {
        "franchise_id": { "eq": this.franchiseId }
      }

    }).subscribe((res) => {
      this.rows = res;
      if (res.length == 0) {
        this.snackBar.open('Email cannot be blank.Please enter a valid email id. ', '', {
          duration: 4000
        });
      }

      this.StoreApi.find({
        where: {
          "franchise_id": this.franchiseId
        }

      }).subscribe((resp) => {
        this.rows2 = resp;
        var store = JSON.parse(JSON.stringify(this.rows2));
        var x = store.map(function(value, index, obj) {


          return value.store_loc
        })

        var preview = JSON.parse(JSON.stringify(this.rows));
        this.location = preview.filter(function(value, index, obj) {
          return x.indexOf(value.Location) < 0;
        })

      })

    })

    var count2 = 0;
    var newarr = [];
    var duplicate = [];
    var unique = {};
    this.multipleuser.find({

    }).subscribe((temp) => {
      var length = temp.length;
      var details = JSON.parse(JSON.stringify(temp));
      details.forEach((item) => {
        count2++;
        if (!unique[item.email]) {
          newarr.push(item);
          unique[item.email] = item;
        } else {
          duplicate.push(item.email);
        }
      });
      if (length == count2) {
        if (duplicate.length > 0) {
          this.already_exists = true;
        } else {
          this.already_exists = false;
        }
      }
    });

  }


  editUser(editrow) {
    this.dialogRef = this.dialog.open(PreviewEditComponent, {
      data: {
        memberdetails: editrow
      },
      panelClass: 'mail-compose-dialog'
    });

    this.dialogRef.afterClosed().subscribe(result => {

      this.ngOnInit()

    });
  }

  deleteUser(deleterow) {
    this.dialogRef = this.dialog.open(PreviewDeleteComponent, {
      data: {
        memberdetails: deleterow
      },
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      // console.log("hhhhhhh", result)
      if (result != undefined && result != false) {
        // this.rows.splice(deleterow.$$index, 1)
        this.ngOnInit();
      }

    });
  }

  addUser() {
    // this.ngOnInit();

    if (this.location.length > 0) {
      this.dialogRef = this.dialog.open(EmailExistsComponent, {
        data: {
          location: this.location

        },
        panelClass: 'mail-compose-dialog'
      });
      this.dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();

      });
    } else {
      this.checkUserCount();
    }


  }

  checkUserCount() {
    // this.multipleuser.find({}).subscribe((temp) => {
    // var details = JSON.parse(JSON.stringify(temp));

    // var newarr = [];
    // var duplicate = [];
    // var unique = {};

    // details.forEach((item) => {
    //   if (!unique[item.email]) {
    //     newarr.push(item);
    //     unique[item.email] = item;
    //   } else {


    //     duplicate.push(item.email);
    //   }
    // });
    // if (duplicate.length > 0) {
    //   this.dialogRef = this.dialog.open(EmailExistsComponent, {
    //     data: {
    //       email_details: duplicate
    //     },
    //     panelClass: 'mail-compose-dialog'
    //   });
    //   this.dialogRef.afterClosed().subscribe(result => {

    //   });
    // } else {
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
        if (response.length < _d.payment_details.users_purchased) {
          if ((this.rows.length + response.length) <= _d.payment_details.users_purchased) {
            this.multipleuser.createMultipleUser({
              data: _d
            }).subscribe((res) => {
              // this.ngOnInit();
              if (res.message.length > 0) {

                this.dialogRef = this.dialog.open(EmailExistsComponent, {
                  data: {
                    email_details: res.message

                  },
                  panelClass: 'mail-compose-dialog'
                });
                this.dialogRef.afterClosed().subscribe(result => {
                  this.ngOnInit();

                });
              } else {
                this.router.navigate(['/' + this._params + '/user-management']);
                this.snackBar.open('Created Successfully', '', {
                  duration: 2000
                });
              }

            }, (error) => {
              this.snackBar.open('Email already exists !', '', {
                duration: 2000
              });

            });
          } else {
            var diff = ((this.rows.length + response.length) - _d.payment_details.users_purchased)
            this.snackBar.open('Count exceeded.Please remove ' + diff + ' users to proceed!', '', {
              duration: 4000
            });
          }
        } else {
          var diff = ((this.rows.length + response.length) - _d.payment_details.users_purchased)
          this.snackBar.open('Count exceeded.Please remove ' + diff + ' users to proceed!', '', {
            duration: 4000
          });
        }

      })
    })

    // }
    // });


  }
}
