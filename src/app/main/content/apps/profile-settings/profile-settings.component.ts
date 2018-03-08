import { Component, OnInit, ElementRef, Inject, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberApi } from '../../../../core/sdk/services/index';
import { FranchiseApi } from '../../../../core/sdk/services/index';
import { StoreApi } from '../../../../core/sdk/services/index';
import { IndustryApi } from '../../../../core/sdk/services/index';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import * as _ from "lodash";
import { envConstant } from '../envConstant';
import { MapsAPILoader } from '@agm/core';

const URL = envConstant.BASE_URL + '/api/Containers/images/upload';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  rows: any;
  rows2: any[];
  industry: any[];
  newFranchise: FormGroup;
  memberProfile: FormGroup;
  franchiseId: any;
  formErrors: any;
  logourl2: any;
  logourl: any;
  new_file_name: any;
  franchise_details: any[];
  already_exists = false;
  locationSearch: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  baseurl = envConstant.BASE_URL + "/api/Containers/images/download/";
  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    private franchise: FranchiseApi,
    private industryApi: IndustryApi,
    private StoreApi: StoreApi,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef < ProfileSettingsComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formErrors = {
      companyname: {},
      location: {},
      email: {},
      first_name: {}

    };
  }

  ngOnInit() {
    this.franchiseId = localStorage.getItem('franchise_id');
    if (localStorage.getItem('role_type') == "EX") {

      this.newFranchise = this.formBuilder.group({
        companyname: [this.data.franchisedetails.company_name, [Validators.required]],
        email: [this.data.franchisedetails.email, [Validators.required]],
        UDA: [this.data.franchisedetails.UDA, [Validators.required]],
        password: [this.data.franchisedetails.UDA, [Validators.required]],
        location: [this.data.franchisedetails.location, [Validators.required]],
        store_id: [this.data.franchisedetails.store_id, [Validators.required]],
        years_operating: [this.data.franchisedetails.years_operating, [Validators.required]],
        Industry: [this.data.franchisedetails.Industry, [Validators.required]],
        company_domain: [this.data.franchisedetails.company_name, [Validators.required]],
        logo: [this.data.franchisedetails.logo, [Validators.required]],
        addon: [this.data.franchisedetails.addon, [Validators.required]],
        payment_details: [this.data.franchisedetails.payment_details, [Validators.required]],
        stripe_cusId: [this.data.franchisedetails.stripe_cusId, [Validators.required]],
        last_login: [this.data.franchisedetails.last_login, [Validators.required]],
        payment_status: [this.data.franchisedetails.payment_status, [Validators.required]],
        created_by_role_id: [this.data.franchisedetails.created_by_role_id, [Validators.required]],
        role_id: [this.data.franchisedetails.role_id, [Validators.required]],
        created_by: [this.data.franchisedetails.created_by, [Validators.required]],
        is_blocked: [this.data.franchisedetails.is_blocked, [Validators.required]]

      });
      this.logourl = this.baseurl + this.data.franchisedetails.logo;
      this.newFranchise.valueChanges.subscribe(() => {
        this.onFormValuesChanged(this.newFranchise);
      });

    } else {
      this.memberProfile = this.formBuilder.group({
        first_name: [this.data.memberdetails.first_name, [Validators.required]],
        email: [this.data.memberdetails.email, [Validators.required]],
        store_id: [this.data.memberdetails.store_id, [Validators.required]],
        designation: [this.data.memberdetails.designation, [Validators.required]],
        role: [this.data.memberdetails.role, [Validators.required]],
        UDA: [this.data.memberdetails.UDA, [Validators.required]],
        password: [this.data.memberdetails.UDA, [Validators.required]],
        created_by: [this.data.memberdetails.created_by, [Validators.required]],
        created_by_role_id: [this.data.memberdetails.created_by_role_id, [Validators.required]],
        role_id: [this.data.memberdetails.role_id, [Validators.required]],
        franchise_id: [this.data.memberdetails.franchise_id, [Validators.required]]

      });
      if(this.data.memberdetails.hasOwnProperty('profile_pic')){

      this.logourl = this.baseurl + this.data.memberdetails.profile_pic;
      }
      else{
        
      this.logourl = "../../assets/images/logos/no_image.png";
      }
      this.memberProfile.valueChanges.subscribe(() => {
        this.onFormValuesChanged(this.memberProfile);
      });
    }




    this.industryApi.find({}).subscribe((res) => {
      this.industry = res;
    })


    this.StoreApi.find({
      where: {
        "franchise_id": this.franchiseId
      }
    }).subscribe((resp) => {
      this.rows2 = resp;
    })


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //console.log("place_finded: ", place.formatted_address);
          this.locationSearch = place.formatted_address.split(",").slice(0, 3).join();
          //console.log("location_in_listener: ", this.locationSearch);
          this.searchElementRef.nativeElement.value = this.locationSearch;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  checkFranchiseName() {


    var name = this.newFranchise.value.companyname;
    this.franchise_details = _.find(this.data.franchisedetails, function(o) {

      return o.company_name == name;
    });

    if (this.franchise_details == undefined) {
      this.already_exists = false;
    } else {
      this.already_exists = true;
    }

  }

  onFormValuesChanged(details) {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = details.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }


  createFranchiseProfile() {
    var new_name = this.newFranchise.value.companyname;
    var str = new_name.replace(/\s+/g, '');
    this.newFranchise.value.company_domain = str;
    this.newFranchise.value.location = this.locationSearch;
    if (this.new_file_name != undefined) {

      this.newFranchise.value.logo = this.new_file_name;
    }
    this.franchise.patchAttributes(this.data.franchisedetails.id, this.newFranchise.value)
      .subscribe(
        data => {
          this.snackBar.open("Profile updated successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);
        },
        error => {

          this.snackBar.open("Some error occurred", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
  }

  createMemberProfile() {
    if (this.new_file_name != undefined) {

      this.memberProfile.value.profile_pic = this.new_file_name;
    }
    this.member.patchAttributes(this.data.memberdetails.id, this.memberProfile.value)
      .subscribe(
        data => {
          this.snackBar.open("Profile updated successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);
        },
        error => {

          this.snackBar.open("Some error occurred", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
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

      this.http.post(URL, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            this.logourl2 = this.baseurl + this.new_file_name;
            console.log('success')
          },
          error => console.log(error)
        )
    }
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
