import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberApi } from '../../../../core/sdk/services/index';
import { RolesApi } from '../../../../core/sdk/services/index';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailExistsComponent } from './email-exists/email-exists.component';
import { StoreApi } from '../../../../core/sdk/services/index';
import { MultipleUsersTempApi } from '../../../../core/sdk/services/index';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { envConstant } from '../envConstant';

declare var Stripe: any;
const URL = envConstant.BASE_URL + '/api/Containers/csv/upload'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  rows: any[];
  form: FormGroup;
  formErrors: any;
  dialogRef: any;
  managerId: any;
  franchise_id: any;
  user_id: any;
  store_id: any;
  temp = [];
  _params: any;
  new_file_name: any;
  updatedRole: any;
  table = {
    offset: 0,
  };

  editing: any;
  editableSelect: {} = {};
  valueText: {} = {};
  value: any;

  constructor(
    private formBuilder: FormBuilder,
    private multipleuser: MultipleUsersTempApi,
    private member: MemberApi,
    private StoreApi: StoreApi,
    private roles: RolesApi,
    public dialog: MatDialog,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.formErrors = {
      email: {},
      location: {},
      password: {}
    };
  }

  editableSelectOptions = [
    { value: '0', text: 'Director' },
    { value: '1', text: 'Manager' },
    { value: '2', text: 'Supervisor' },
    { value: '3', text: 'Employee' }
  ];

  loadInLine(value, row) {

    if (value == 'Director') {
      this.editableSelect[row.id] = '0';
      this.valueText[row.id] = 'Director';
    } else if (value == 'Supervisor') {
      this.editableSelect[row.id] = '1';
      this.valueText[row.id] = 'Supervisor';
    } else if (value == 'Supervisor') {
      this.editableSelect[row.id] = '2';
      this.valueText[row.id] = 'Supervisor';
    } else if (value == 'Employee') {
      this.editableSelect[row.id] = '3';
      this.valueText[row.id] = 'Employee';
    }

    this.editing = true;

  }

  //Saving the selected value EDIT ROLE
  saveEditable(value, row) {
    var roleId;
    var role_name = "";
    if (value == 0) {
      role_name = this.editableSelectOptions[0].text;
    } else if (value == 1) {
      role_name = this.editableSelectOptions[1].text;
    } else if (value == 2) {
      role_name = this.editableSelectOptions[2].text;
    } else {
      role_name = this.editableSelectOptions[3].text;
    }
    this.roles.findOne({
      where: {
        role: role_name
      }
    }).subscribe((role) => {
      var details = JSON.parse(JSON.stringify(role));
      roleId = details.id;
      if (value == 0) {
        // this.updatedRole = this.editableSelectOptions[0].text;
        this.valueText[row.id] = 'Director';
        this.editableSelect[row.id] = '0';
      }
      if (value == 1) {
        // this.updatedRole = this.editableSelectOptions[0].text;
        this.valueText[row.id] = 'Manager';
        this.editableSelect[row.id] = '1';
      }
      if (value == 2) {
        this.valueText[row.id] = 'Supervisor';
        this.editableSelect[row.id] = '2';
      }
      if (value == 3) {
        this.valueText[row.id] = 'Employee';
        this.editableSelect[row.id] = '3';
      }
      this.member.patchAttributes(row.id, { "role_id": roleId })
        .subscribe(
          data => {
            this.snackBar.open("Role changed successfully", "", {
              duration: 2000,
            });

          },
          error => {
            this.snackBar.open("Some error occured", "", {
              duration: 2000,
            });
          }
        );

      //this.editing = false;
      this.editing = false;

    }, (error) => {
      console.log("Server error");
    });

  }


  ngOnInit() {
    var type = {};
    // this.rows = null;
    this.franchise_id = localStorage.getItem('franchise_id');
    this.user_id = localStorage.getItem('user_id');
    this.store_id = localStorage.getItem('store_id');
    if (localStorage.getItem('role_type') == "EX" || localStorage.getItem('role_type') == "D") {
      type = {
        where: {
          "franchise_id": this.franchise_id
        },
        include: ["Store", "Role"],
        order: 'createdAt DESC'
      }
    } else {
      type = {
        where: {
          "franchise_id": this.franchise_id,
          "store_id": this.store_id
        },
        include: ["Store", "Role"],
        order: 'createdAt DESC'
      }
    }

    this.member.find(type).subscribe((res) => {
      this.rows = res;
      this.rows.map((item: any) => {
        if (item.hasOwnProperty("Role")) {
          if (item.Role.role == 'Director') {
            this.editableSelect[item.id] = '0';
            this.valueText[item.id] = 'Director';
          } else if (item.Role.role == 'Manager') {
            this.editableSelect[item.id] = '2';
            this.valueText[item.id] = 'Manager';
          } else if (item.Role.role == 'Supervisor') {
            this.editableSelect[item.id] = '2';
            this.valueText[item.id] = 'Supervisor';
          } else if (item.Role.role == 'Employee') {
            this.editableSelect[item.id] = '3';
            this.valueText[item.id] = 'Employee';
          }

        } else {
          console.log("22")

        }

        // if (item.role == 'Manager') {
        //   this.editableSelect[item.id] = '1';
        //   this.valueText[item.id] = 'Manager';
        // } else if (item.role == 'Supervisor') {
        //   this.editableSelect[item.id] = '2';
        //   this.valueText[item.id] = 'Supervisor';
        // } else if (item.role == 'Employee') {
        //   this.editableSelect[item.id] = '3';
        //   this.valueText[item.id] = 'Employee';
        // }
      })
      this.temp = res;
    })



    this.route.params.subscribe(params => {
      this._params = params['name'];

    })

    let _user = sessionStorage.getItem('currentUser');
    if (_user == null || !_user) {
      this.router.navigate(['/' + this._params + '/login']);
    }
  }

  addUser() {
    this.StoreApi.find({
      where: {
        "franchise_id": this.franchise_id,
      }
    }).subscribe((store) => {
      if (store.length > 0) {

        this.dialogRef = this.dialog.open(AddUserComponent, {
          panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed().subscribe(result => {

          if (result != false && result != undefined) {
            this.ngOnInit();
          }

        });
      } else {
        this.snackBar.open('Please create store to add users !', '', {
          duration: 4000
        });
      }

    })


  }

  editUser(editrow) {
    this.dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        memberdetails: editrow
      },
      panelClass: 'mail-compose-dialog'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.ngOnInit()
      }


    });
  }

  deleteUser(deleterow) {
    this.dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {
        memberdetails: deleterow
      },
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.rows.splice(deleterow.$$index, 1)
      }

    });
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return ((d.first_name.toLowerCase().indexOf(val) !== -1 || !val) || (d.email.toLowerCase().indexOf(val) !== -1 || !val));
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      var file_ext = file.name.substr(file.name.lastIndexOf('.') + 1);
      this.new_file_name = new Date().getTime() / 1000 + '.' + file_ext;

      let formData: FormData = new FormData();
      formData.append('uploadFile', file, this.new_file_name);
      let headers = new Headers()
      let options = new RequestOptions({ headers: headers });

      // let apiUrl1 = "/api/container";  
      this.http.post(URL, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error, "errrr")
        )
    }

    var _d = {
      filename: this.new_file_name,
      franchise_id: this.franchise_id,
      user_id: this.user_id,
      created_by_role_id: localStorage.getItem('role_id')
    }

    this.member.uploadCsvFile({
      data: _d
    }).subscribe((res) => {
        // var count2 = 0;
        // var newarr = [];
        // var duplicate = [];
        // var unique = {};
        // this.multipleuser.find({

        // }).subscribe((temp) => {
        //   var length = temp.length;
        //   var details = JSON.parse(JSON.stringify(temp));
        //   details.forEach((item) => {
        //     count2++;
        //     if (!unique[item.email]) {
        //       newarr.push(item);
        //       unique[item.email] = item;
        //     } else {
        //       duplicate.push(item.email);
        //     }
        //   });
        //   if (length == count2) {
        //     if (duplicate.length > 0) {
        //       // this.already_exists = true;
        //       this.snackBar.open('Please remove duplicate emails before uploading csv !', '', {
        //         duration: 4000
        //       });
        //     } else {
        //       // this.already_exists = false;
        //       this.router.navigate(['/' + this._params + '/preview']);
        //     }
        //   }
        // });
 this.router.navigate(['/' + this._params + '/preview']);

      },
      (error) => {
        this.snackBar.open('Something went wrong !', '', {
          duration: 2000
        });

      });

  }

  createSampleFile() {

    var _d = {
      franchise_id: this.franchise_id
    }
    this.StoreApi.convertToCSV({
      data: _d
    }).subscribe((res) => {
      if (res) {
        var mydiv = document.getElementById("down");
        var link = document.createElement('a');

        link.href = envConstant.BASE_URL + "/api/Containers/csv/download/sample.csv";
        mydiv.appendChild(link);
        link.click();
      } else {
        this.snackBar.open('Please create store to download sample csv', '', {
          duration: 4000
        });
      }

    }, (error) => {
      this.snackBar.open('Something went wrong !', '', {
        duration: 2000
      });
    });
  }


}
