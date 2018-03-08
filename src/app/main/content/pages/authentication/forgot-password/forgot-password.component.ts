import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FranchiseApi } from '../../../../../core/sdk/services/custom/Franchise';
import { Franchise } from '../../../../../core/sdk/models/Franchise';
import { MemberApi } from '../../../../../core/sdk/services/custom/Member';
import { Member } from '../../../../../core/sdk/models/Member';
import { MatSnackBar } from '@angular/material';
@Component({
    selector   : 'fuse-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : fuseAnimations
})
export class FuseForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;
    loginUrlParams: any;
    franchiseDetails : any;
    logourl: any;
    _url = "http://demo.host3e.com:3017/api/Containers/images/download/";

    constructor(
        private franchiseApi: FranchiseApi,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private router: Router,
        public franchiseAPi: FranchiseApi,
        public memberApi : MemberApi
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.forgotPasswordFormErrors = {
            email: {}
        };

        this.route.params.subscribe(params => {
            let date = params['name'];
            console.log(date, "date"); // Print the parameter to the console. 
            this.loginUrlParams = params['name'];
          });

        this.franchiseApi.find({
            where: { company_domain: this.loginUrlParams }
          }).subscribe((res) => {
            if (res.length > 0) {
      
              this.franchiseDetails = res[0];
      
              if (this.franchiseDetails.logo == null) {
                this.logourl = "../../../../../../../assets/images/logos/no_image.png";
              } else {
      
                this.logourl = this._url + this.franchiseDetails.logo;
                
              }
      
            } else {
              this.router.navigate(['404']);
            }
        })
      
    }

    ngOnInit()
    {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    forgetPasswordToLogin() {

        //console.log("password redirect: ", "password redirect!!!");
        //console.log("url=:", localStorage.getItem('url'));

        this.router.navigate(['/' + this.loginUrlParams + '/login']);
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordFormErrors.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }

    passwordReset() {

        //console.log("user email", this.forgotPasswordForm.value);
        console.log("user email", this.forgotPasswordForm.value.email);

        this.memberApi.checkLoginType({email:this.forgotPasswordForm.value.email}).subscribe((res) => {
            console.log("res_type is " ,  res.type);

            if(res.type == "franchise"){

                this.franchiseAPi.resetPassword({ "email": this.forgotPasswordForm.value.email, "type": "f" })
                .subscribe(
                    data => {
                    console.log(data);
                    this.router.navigate(['/' + this.loginUrlParams + '/login']);
        
                    this.snackBar.open('Reset password link sent to your email!', '', {
                        duration: 2000
                    });
        
                    },
                    error => {
                    console.log(error);
                    this.snackBar.open('Email not found!', '', {
                        duration: 2000
                    });
                    //this.openSnackBar(error.message);
                    });

            }

            else if(res.type == "member"){

                this.memberApi.resetPassword({ "email": this.forgotPasswordForm.value.email})
                .subscribe(
                    data => {
                    console.log(data);
                    this.router.navigate(['/' + this.loginUrlParams + '/login']);
        
                    this.snackBar.open('Reset password link sent to your email!', '', {
                        duration: 2000
                    });
        
                    },
                    error => {
                    console.log(error);
                    this.snackBar.open('Email not found!', '', {
                        duration: 2000
                    });
                    //this.openSnackBar(error.message);
                    });
            }

            else if (res.type == "no"){

                this.snackBar.open('Not a valid user!', '', {
                    duration: 2000
                });
            }

        }, 
        (error) => {
            console.log("error is " ,  error);
        }); 
    }
}
