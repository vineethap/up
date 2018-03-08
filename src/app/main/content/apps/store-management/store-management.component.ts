import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '../../../../core/sdk/models/Store';
import { StoreApi } from '../../../../core/sdk/services/index';
import { AddStoreComponent } from './add-store/add-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { DeleteStoreComponent } from './delete-store/delete-store.component';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoreManagementComponent implements OnInit {

  rows: any[];
  form: FormGroup;
  formErrors: any;
  dialogRef: any;
  temp = [];

  constructor(
    private formBuilder: FormBuilder,
    private storeApi: StoreApi,
    public dialog: MatDialog,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {


  }

  ngOnInit() {
    var userId = localStorage.getItem('user_id');
    var franchise_id = localStorage.getItem('franchise_id');

    this.storeApi.find({
      where: {
        franchise_id : franchise_id 
      },
      order: 'createdAt DESC'
    }).subscribe((res) => {
      this.rows = res;
      this.temp = res;

    })
  }


  addStore() {
    this.dialogRef = this.dialog.open(AddStoreComponent, {
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed().subscribe(result => {

      if (result != false && result != undefined) {
        // this.rows.push(result);
        this.ngOnInit();
      }

    });

  }

  editStore(editrow) {
    this.dialogRef = this.dialog.open(EditStoreComponent, {
      data: {
        storedetails: editrow
      },
      panelClass: 'mail-compose-dialog'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()

    });
  }

  deleteStore(deleterow) {
    this.dialogRef = this.dialog.open(DeleteStoreComponent, {
      data: {
        storedetails: deleterow
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
      return ((d.store_name.toLowerCase().indexOf(val) !== -1 || !val) || (d.brand.toLowerCase().indexOf(val) !== -1 || !val));
    });
    this.rows = temp;
    //this.table.offset = 0;
  }
}
