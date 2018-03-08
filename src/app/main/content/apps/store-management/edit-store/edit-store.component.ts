import { Component, OnInit, ElementRef, Inject, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '../../../../../core/sdk/models/Store';
import { StoreApi } from '../../../../../core/sdk/services/custom/Store';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import * as _ from "lodash";
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { LocationTempApi } from '../../../../../core/sdk/services/index';


@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {

  rows: any[];
  rows2: any[];
  editStore: FormGroup;
  formErrors: any;
  locationSearch: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private storeApi: StoreApi,
    public snackBar: MatSnackBar,
    private locationTempApi: LocationTempApi,
    private el: ElementRef,
    public dialogRef: MatDialogRef < EditStoreComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.formErrors = {
      store_name: {},
      brand: {},
      store_loc: {}
      /* store_reg: {},
      store_area: {},
      store_street: {},
      store_city: {},
      store_state: {},
      store_zip: {} */
    };
  }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.locationSearch = place.formatted_address.split(",").slice(0, 3).join();
          this.searchElementRef.nativeElement.value = this.locationSearch;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });

    this.editStore = this.formBuilder.group({
      store_name: [this.data.storedetails.store_name, [Validators.required]],
      store_loc: [this.data.storedetails.store_loc, [Validators.required]],
      brand: [this.data.storedetails.brand, [Validators.required]],
      franchise_id: [this.data.storedetails.franchise_id, [Validators.required]],
      created_by: [this.data.storedetails.created_by, [Validators.required]],
      role_id: [this.data.storedetails.role_id, [Validators.required]]


    });

  }

  onSubmit() {

    // if (this.locationSearch != undefined) {
    //   this.editStore.value.store_loc = this.locationSearch;
    // }
    this.storeApi.patchAttributes(this.data.storedetails.id, { store_name: this.editStore.value.store_name, brand: this.editStore.value.brand, store_loc: this.locationSearch })
      .subscribe(
        data => {
          this.snackBar.open("Edited successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);

          this.locationTempApi.findOne({
            where: {
              store_id: this.data.storedetails.id

            }
          }).subscribe((res) => {
            var store = JSON.parse(JSON.stringify(res));
            this.locationTempApi.patchAttributes(store.id,{Location:this.editStore.value.store_loc})
              .subscribe(
                data => {},
                error => {

                }
              );

          })
        },
        error => {
          this.snackBar.open("Some error occured", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
  }

  /*  //only number in the input text
   onlyNumberKey(event) { 
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
 */

}
