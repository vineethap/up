import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Franchise } from '../../../../../core/sdk/models/index';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { Member } from '../../../../../core/sdk/models/index';
import { MemberApi, PulseSurveyApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { envConstant } from '../../../apps/envConstant';


@Component({
  selector: 'fuse-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  animations: fuseAnimations
})
export class FuseSurveyComponent implements OnInit {
  model: any = {};
  loginForm: FormGroup;
  loginFormErrors: any;
  details: any = {};
  _url = envConstant.BASE_URL + '/api/Containers/images/download/';
  logourl: any;
  url_params: any;
  survey_param: any;
  survey_data: any;
  message_text: any;
  constructor(
    private franchise: FranchiseApi,
    private memberApi: MemberApi,
    private route: ActivatedRoute,
    private router: Router,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public Pulsesurvey: PulseSurveyApi


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


  }


  ngOnInit() {
    this.message_text = "loading..";
    this.route.params.subscribe(params => {
      this.survey_param = params['id'];

    });
    var survey_temp = atob(this.survey_param);
    this.survey_data = JSON.parse(survey_temp);
    this.Pulsesurvey.find({
      where: {
        "employee_id": this.survey_data.employee_id,
        "type_id": this.survey_data.type_id,
        "type": this.survey_data.type,
      }
    }).subscribe((data1) => {
      var find_data = JSON.parse(JSON.stringify(data1));
      var survey_entry = {};
      if (find_data.length > 0) {
        survey_entry = {
          "id": find_data[0].id,
          "employee_id": this.survey_data.employee_id,
          "type_id": this.survey_data.type_id,
          "type": this.survey_data.type,
          "rating": this.survey_data.survey
        }
      }
      else {
        survey_entry = {
          "employee_id": this.survey_data.employee_id,
          "type_id": this.survey_data.type_id,
          "type": this.survey_data.type,
          "rating": this.survey_data.survey
        }
      }
      this.Pulsesurvey.patchOrCreate(survey_entry).subscribe((data) => {
        this.message_text = "Thank you for your time.";
      });
    })
  }

  /**
   * @name Login
   * @params
   * @description
   * Login registered user with data.user.is_verified == "1" && data.user.status == "1"
   *
   */

}
