import { Component, OnInit, ElementRef, Inject, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Store } from '../../../../../core/sdk/models/Store';
import { StoreApi } from '../../../../../core/sdk/services/custom/Store';
import { LocationTempApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from "lodash";
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  //public searchControl: FormControl;
  googleElem: {};
  obj: any = [];
  rows: any[];
  store_duplicate: any[];
  duplicate: any[];
  store_details: any[];
  arraylist: any;
  addstore: any = {};
  newStore: FormGroup;
  formErrors: any;
  locIdx: number = 0;
  locationSearch: any;
  location_details: any[];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private storeApi: StoreApi,
    private locationtemp: LocationTempApi,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public dialogRef: MatDialogRef < AddStoreComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.formErrors = {
      store_name: {},
      store_loc: {},
      brand: {}
    };
  }

  ngOnInit() {
    this.locIdx = 0;
    var franchiseId = localStorage.getItem('franchise_id');
    let newRow = this.initItemRows();
    this.newStore = this.formBuilder.group({
      itemRows: this.formBuilder.array([newRow])

    });
    this.addLocation(this.locIdx, newRow);
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       this.locationSearch = place.formatted_address.split(",").slice(0, 3).join();
    //       this.searchElementRef.nativeElement.value = this.locationSearch;
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //     });
    //   });
    // });


    this.storeApi.find({

    }).subscribe((res) => {
      this.store_details = res;

    }, (error) => {
      console.log("Server error");
    });
  }

  addLocation(id, rowObj) {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete( < HTMLInputElement > document.getElementById("address-" + id), {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.locationSearch = place.formatted_address.split(",").slice(0, 3).join();
          rowObj.value.store_loc = this.locationSearch;
          //verify result

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.storeApi.find({
            where: {
              franchise_id: localStorage.getItem('franchise_id'),
              store_loc: this.locationSearch
            }
          }).subscribe((res) => {
            this.store_duplicate = res;
            if (res.length > 0) {
              this.snackBar.open(this.locationSearch + ' already exists!', '', {
                duration: 3000
              });
              this.newStore.value.store_loc = "";
            }
          });

        });
      });
    });

  }
  initItemRows() {
    return this.formBuilder.group({
      store_name: ['', Validators.required],
      brand: ['', Validators.required],
      store_loc: ['', Validators.required]
    });
  }
  addNewRow() {
    this.locIdx++;
    const control = < FormArray > this.newStore.controls['itemRows'];
    let newRow = this.initItemRows();
    control.push(newRow);
    setTimeout(() => {
      this.addLocation(this.locIdx, newRow);
    }, 1000)
  }

  deleteRow(index: number) {
    const control = < FormArray > this.newStore.controls['itemRows'];
    control.removeAt(index);
  }

  createStore() {
    var arr = [];
    const control = < FormArray > this.newStore.controls['itemRows'];
    this.arraylist = []
    let array = control.value;
    var franchiseId = localStorage.getItem('franchise_id');

    for (var value of array) {

      var chars = "abcdefghijklmnopqrstuvwxyz@#$&ABCDEFGHIJKLMNOP1234567890";
      var pass = "";
      for (var x = 0; x < 5; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      pass = "upfront" + pass;

      this.arraylist.push({
        store_name: value.store_name,
        brand: value.brand,
        store_loc: value.store_loc,
        franchise_id: franchiseId,
        created_by: localStorage.getItem('user_id'),
        created_by_role_id: localStorage.getItem('role_id')

      })
    }
    
    // this.arraylist.map(value => {
    //   this.storeApi.find({
    //     where: {
    //       franchise_id: localStorage.getItem('franchise_id'),
    //       store_loc: value.store_loc
    //     }
    //   }).subscribe((res) => {
    //     if (res.length > 0) {
    //       arr.push(res[0]);
    //     }

    //   });
    // })
 

    // console.log("bbbbbbb", arr.length)
    // if (arr.length == 0) {
      this.storeApi.create(this.arraylist)
        .subscribe(
          (data) => {
            this.snackBar.open('Store Created Successfully', '', {
              duration: 2000
            });
            this.dialogRef.close(data);
          }, (error) => {
            this.snackBar.open('Some Error Occured!', '', {
              duration: 2000
            });
            this.dialogRef.close();
          });
    // } else {
    //   this.snackBar.open('Please remove already existing locations !', '', {
    //     duration: 2000
    //   });
    // }

  }



  /*  //only number in the input text
   onlyNumberKey(event) {
     return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
   } */

}
