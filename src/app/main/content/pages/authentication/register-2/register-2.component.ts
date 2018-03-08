import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { RolesApi } from '../../../../../core/sdk/services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import { IndustryApi } from '../../../../../core/sdk/services/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from "lodash";
import { envConstant } from '../../../apps/envConstant';

// const URL = "http://demo.host3e.com:3017/api/Containers/images/upload";
const URL =  envConstant.BASE_URL + '/api/Containers/images/upload'


@Component({
  selector: 'fuse-register-2',
  templateUrl: './register-2.component.html',
  styleUrls: ['./register-2.component.scss']
})
export class FuseRegister2Component implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  addbrand: any = {};
  industry_set: any[];
  selectedIndustry: any;
  new_file_name: any;
  baseurl = envConstant.BASE_URL + '/api/Containers/images/download/';
  filename: any;
  loginUrlParams: any;
  franchise_details: any[];
  already_exists = false;
  rows: any[];
  created_by_role_id: any;
  role_id: any;
  role_data: any[];
  emailValid : any = false;

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    public franchiseApi: FranchiseApi,
    public roles: RolesApi,
    private industryApi: IndustryApi,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.registerFormErrors = {
      companyname: {},
      email: {},
      yearsOfOperating: {},
      location: {}
    };


    /*   this.route.params.subscribe(params => {
          let login_url = params['name'];
          console.log("login_url", login_url); // Print the parameter to the console. 
          this.loginUrlParams = params['name'];
      }); */


  }

  ngOnInit() {
    var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.registerForm = this.formBuilder.group({
      companyname: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern(emailValidation)]],
      yearsOfOperating: ['', ],
      location: ['', ],
      password: ['', ],
      Industry: ['', ]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });



    this.industryApi.find({}).subscribe((res) => {
      // console.log("11111", res)
      this.industry_set = res;
    })

    this.roles.find({

    }).subscribe((role) => {
      this.role_data = role;

      this.role_data.forEach((resp) => {
        if (resp.role_type == "EX") {
          this.role_id = resp.id;
        } else if (resp.role_type == "A") {
          this.created_by_role_id = resp.id;
        }

      });
    }, (error) => {
      console.log("Server error");
    });

  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }


  /* checkMail(){
    
  } */

  //registering api for franchise
  createFranchise() {


    
    console.log("email: ", this.registerForm.value.email);

    console.log("matches..");
      this.emailValid = true;

      var chars = "abcdefghijklmnopqrstuvwxyz@#$&ABCDEFGHIJKLMNOP1234567890";
      var pass = "";
      for (var x = 0; x < 5; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      pass = "upfront" + pass;
      var new_name = this.registerForm.value.companyname;
      var str = new_name.replace(/\s+/g, '');
  
      this.addbrand = {
        company_name: this.registerForm.value.companyname,
        UDA: pass,
        company_domain: str,
        password: pass,
        email: this.registerForm.value.email,
        location: this.registerForm.value.location,
        years_operating: this.registerForm.value.yearsOfOperating,
        Industry: this.registerForm.value.Industry,
        logo: this.new_file_name,
        payment_status: false,
        created_by: "",
        created_by_role_id: "",
        role_id: this.role_id,
        store_id:""
      }
  
      this.franchiseApi.create(this.addbrand)
        .subscribe(
          (data) => {
  
            // console.log("data", data)
  
            this.snackBar.open('Successfully created. Please check your email !', '', {
              duration: 4000
            });
  
            
  
           this.registerForm = this.formBuilder.group({
              companyname: [null, ],
              email: [null, ],
              yearsOfOperating: ['', ],
              location: ['', ],
              password: ['', ],
              Industry: ['', ],
              filename: ['', ]
            });
            this.filename = "";
            //this.router.navigate(['/register']);
            //this.dialogRef.close(data);
          }, (error) => {
            this.snackBar.open(error.name, '', {
              duration: 2000
            });
            //this.dialogRef.close();
          });
    

    

  }

  //uploading company logo
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];


      var file_ext = file.name.substr(file.name.lastIndexOf('.') + 1);
      this.new_file_name = new Date().getTime() / 1000 + '.' + file_ext;
      this.filename = file.name;

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
          error => console.log(error)
        )
    }
  }

  //only number in the input text
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  /*
   * check company name already exists
   */


  checkFranchiseName() {

    var name = this.registerForm.value.companyname;
    this.franchise_details = _.find(this.rows, function(o) {

      return o.company_name == name;
    });

    if (this.franchise_details == undefined) {
      this.already_exists = false;
    } else {
      this.already_exists = true;
    }

  }
}
