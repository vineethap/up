import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Franchise } from '../../../../../core/sdk/models/index';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { Member } from '../../../../../core/sdk/models/index';
import { MemberApi, MemberCheckinApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { envConstant } from '../../../apps/envConstant';


@Component({
  selector: 'fuse-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.scss'],
  animations: fuseAnimations
})
export class AcknowledgeComponent implements OnInit {
  model: any = {};
  loginForm: FormGroup;
  loginFormErrors: any;
  details: any = {};
  _url = envConstant.BASE_URL + '/api/Containers/images/download/';
  logourl: any;
  url_params: any;
  ack_param: any;
  ack_data: any;
  message_text: any;
  constructor(
    private franchise: FranchiseApi,
    private memberApi: MemberApi,
    private route: ActivatedRoute,
    private router: Router,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public memberCheckinApi: MemberCheckinApi


  ) {

    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });




  }


  ngOnInit() {
    this.message_text = "loading..";
    this.route.params.subscribe(params => {
      this.ack_param = params['id'];

    });
    var ack_temp = atob(this.ack_param);
    this.ack_data = JSON.parse(ack_temp);
    if (this.ack_data.hasOwnProperty('member_checkin_id')){
      
      console.log('params')
      this.memberCheckinApi.find({
        where: {
          id: this.ack_data.member_checkin_id
        }
      }).subscribe((data1) => {
        var find_data = JSON.parse(JSON.stringify(data1));
      if (find_data.length > 0) {
        find_data[0].ack_receive=1;
        this.memberCheckinApi.patchAttributes(this.ack_data.member_checkin_id,find_data[0]).subscribe((data) => {
          this.message_text = "Thank you for your time.";
        });
      }
      else{
        this.message_text = "No data found";
      }
    })
  }
  }

  /**
   * @name Login
   * @params
   * @description
   * Login registered user with data.user.is_verified == "1" && data.user.status == "1"
   *
   */

}
