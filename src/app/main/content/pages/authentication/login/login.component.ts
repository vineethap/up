import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Franchise } from '../../../../../core/sdk/models/index';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { Member } from '../../../../../core/sdk/models/index';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { envConstant } from '../../../apps/envConstant';


@Component({
  selector: 'fuse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
  model: any = {};
  loginForm: FormGroup;
  loginFormErrors: any;
  details: any = {};
  _url = envConstant.BASE_URL + '/api/Containers/images/download/';
  logourl: any;
  url_params: any;

  constructor(
    private franchise: FranchiseApi,
    private memberApi: MemberApi,
    private route: ActivatedRoute,
    private router: Router,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,


  ) {

    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };

    this.route.params.subscribe(params => {
      let date = params['name'];
      console.log(date, "ioioiu"); // Print the parameter to the console. 
    });
  }


  ngOnInit() {



    let _params;
    this.route.params.subscribe(params => {
      _params = params['name'];
      this.url_params = params['name'];
    })


    this.franchise.find({
      where: { company_domain: this.url_params }
    }).subscribe((res) => {
      if (res.length > 0) {

        this.details = res[0];

        if (this.details.logo == null) {
          this.logourl = "../../../../../../../assets/images/logos/no_image.png";
        } else {

          this.logourl = this._url + this.details.logo;

        }

      } else {
        this.router.navigate(['404']);
      }
    })


    //console.log("fran_id_oninit: ", this.details);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }


  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  // Toast message
  openSnackBar(msg) {
    this.snackBar.open(msg, '', {
      duration: 2000
    });
  }

  /**
   * @name Login
   * @params
   * @description
   * Login registered user with data.user.is_verified == "1" && data.user.status == "1"
   *
   */


  login() {

    //remote method for checkLoginType

    var emailValue = { email: this.loginForm.value.email }

    let _params;
    this.model = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    /* var data = {"email" : "nvngkr@gmail.com"}      
    console.log("data.email: ", data.email); */

    this.memberApi.checkLoginType({
      email: emailValue.email
    }).subscribe((res) => {

        if (res.type == "franchise") {

          this.model.company_domain = this.url_params;
          this.franchise.login(this.model)
            .subscribe(
              (data) => {

                if (data.user.is_blocked == 1) {
                  this.openSnackBar(data.user.company_name + ' is blocked !');

                } else {
                  localStorage.setItem('user_id', data.user.id);
                  localStorage.setItem('franchise_id', data.user.id);
                  localStorage.setItem('company_name', data.user.company_name);
                  localStorage.setItem('role_id', res.user.Role.id);
                  localStorage.setItem('role_type', res.user.Role.role_type);
                  localStorage.setItem('store_id', data.user.store_id);
                  //localStorage.setItem('role_type', this.details.company_name);
                  //sessionStorage.setItem('currentUser', btoa(JSON.stringify(data)));
                  //localStorage.setItem('userType', 'Franchise');
                  sessionStorage.setItem('currentUser', JSON.stringify(this.details));
                  this.route.params.subscribe(params => {
                    _params = params['name'];
                    localStorage.setItem('url', _params)
                    // this.router.navigate(['/' + _params + '/user-management']);
                    this.router.navigate(['/' + _params + '/dashboards']);
                  });


                  data.last_login = new Date();
                  this.franchise.patchAttributes(data.userId, { last_login: data.last_login })
                    .subscribe(
                      data => {},
                      error => {

                        this.snackBar.open("Some error occured", "", {
                          duration: 2000,
                        });

                      }
                    );
                }
              }, (error) => {

                this.openSnackBar("Wrong Credentials !");
              });
        } else if (res.type == "member") {

          let fr_id = res.franchise_id.toString();
          let deta_id;

          if (this.details.id != undefined) {
            deta_id = this.details.id.toString()
          } else {}

          if (fr_id === deta_id) {

            if (this.details.is_blocked == 0) {

              this.memberApi.login(this.model)
                .subscribe(
                  (data) => {

                            //for selecting company name
                            this.franchise.find({
                              where: { id: data.user.franchise_id }

                            }).subscribe((resFra) => {

                              var _d = JSON.parse(JSON.stringify(resFra));  

                            

                                  /*localStorage.setItem('userId', data.userId) 
                                  localStorage.setItem('userId', data.userId)
                                  localStorage.setItem('userType', 'Supervisor');*/
                                  localStorage.setItem('user_id', data.user.id);
                                  localStorage.setItem('franchise_id', data.user.franchise_id);
                                  localStorage.setItem('company_name', _d[0].company_name);
                                  localStorage.setItem('role_id', res.user.Role.id);
                                  localStorage.setItem('role_type', res.user.Role.role_type);
                                  localStorage.setItem('store_id', data.user.store_id);

                                  if (res.user.Role.role_type == 'D') { //director         

                                    this.route.params.subscribe(params => {
                                      _params = params['name'];
                                      localStorage.setItem('url', _params)
                                      console.log("params_manager: ", _params); // Print the parameter to the console. 
                                      this.router.navigate(['/' + _params + '/director-dashboards']);
                                    });
                                  }

                                  if (res.user.Role.role_type == 'M') { //Manager

                                    this.route.params.subscribe(params => {
                                      _params = params['name'];
                                      localStorage.setItem('url', _params)
                                      console.log("params_manager: ", _params); // Print the parameter to the console. 
                                      this.router.navigate(['/' + _params + '/manager-dashboards']);
                                    });

                                  }

                                  if (res.user.Role.role_type == 'S') { //Supervisor

                                    this.route.params.subscribe(params => {
                                      _params = params['name'];
                                      localStorage.setItem('url', _params)
                                      console.log("params_manager: ", _params); // Print the parameter to the console. 
                                      this.router.navigate(['/' + _params + '/supervisor-dashboards']);
                                    });
                                  }

                                  if (res.user.Role.role_type == 'EM') { //Employee

                                    this.route.params.subscribe(params => {
                                      _params = params['name'];
                                      localStorage.setItem('url', _params)
                                      console.log("params_manager_empl: ", _params); // Print the parameter to the console. 
                                      this.router.navigate(['/' + _params + '/employee-dashboards']);
                                    });
                                  }



                                  this.franchise.findOne({
                                    where: {
                                      id: data.user.franchise_id,

                                    }
                                  }).subscribe((fran) => {
                                    var _frn = JSON.parse(JSON.stringify(fran));
                                    sessionStorage.setItem('currentUser', JSON.stringify(fran));

                                  });

                                  data.last_login = new Date();

                                  this.memberApi.patchAttributes(data.userId, { last_login: data.last_login })
                                    .subscribe(
                                      data => {},
                                      error => {

                                      }
                                    );

                                }, (error) => {

                                  this.openSnackBar("Wrong Credentials !");
                                });

                    }, (error) => {});



            } else {
              this.openSnackBar("Franchise is blocked!!!");
            }


          } else {
            this.openSnackBar("Not a member under this franchise !");
          }

        }
      },
      (error) => {});
    /**/
  }


  createAccount() {
    this.router.navigate(['/' + this.url_params + '/register']);
  }

  forgotPassword() {
    this.router.navigate(['/' + this.url_params + '/forgot-password']);
    //this.router.navigate(['/pages/auth/forgot-password']);

  }
}
