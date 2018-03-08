import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { FranchiseApi } from '../../core/sdk/services/index';
import { MemberApi } from '../../core/sdk/services/index';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProfileSettingsComponent } from '../content/apps/profile-settings/profile-settings.component';
import { ChangePasswordComponent } from '../content/apps/change-password/change-password.component';
import { envConstant } from '../content/apps/envConstant';


@Component({
  selector: 'fuse-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})

export class FuseToolbarComponent {
  userStatusOptions: any[];
  languages: any;
  selectedLanguage: any;
  showLoadingBar: boolean;
  horizontalNav: boolean;
  url: any;
  userid: any;
  name: any;
  imgSrc: any;
  dialogRef: any;
  role_type: any;
  logo_url = envConstant.BASE_URL + "/api/Containers/images/download/";

  constructor(private router: Router,
    private franchise: FranchiseApi,
    private member: MemberApi,
    private fuseConfig: FuseConfigService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar

  ) {
    this.url = localStorage.getItem('url')
    this.userStatusOptions = [{
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [{
        'id': 'en',
        'title': 'English',
        'flag': 'us'
      },
      {
        'id': 'es',
        'title': 'Spanish',
        'flag': 'es'
      },
      {
        'id': 'tr',
        'title': 'Turkish',
        'flag': 'tr'
      }
    ];

    this.selectedLanguage = this.languages[0];

    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoadingBar = true;
        }
        if (event instanceof NavigationEnd) {
          this.showLoadingBar = false;
        }

      });
    if (localStorage.getItem('role_type') == "EX") {
      this.userid = localStorage.getItem('user_id');
      this.franchise.find({
        where: { id: this.userid }

      }).subscribe((res) => {

        var _d = JSON.parse(JSON.stringify(res));
        if (_d[0] != null) {
          this.name = _d[0].company_name;
          if (_d[0].logo == null) {
            this.imgSrc = "../../assets/images/logos/no_image.png";
          } else {
            this.imgSrc = this.logo_url + _d[0].logo;
          }
        }
      }, (error) => {});
    } else {
      this.userid = localStorage.getItem('user_id');
      this.member.find({
        where: { id: this.userid }

      }).subscribe((res) => {
        var _d = JSON.parse(JSON.stringify(res));
        if (_d[0] != null) {
          this.name = _d[0].first_name;
          if (_d[0].profile_pic == null) {
            this.imgSrc = "../../assets/images/logos/no_image.png";
          } else {
            this.imgSrc = this.logo_url + _d[0].profile_pic;
          }
        }
      }, (error) => {});
    }



    // this.fuseConfig.onSettingsChanged.subscribe((settings) => {
    //     this.horizontalNav = settings.layout.navigation === 'top';
    // });
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/' + this.url + '/login']);
  }
  gotoProfile() {
    this.router.navigate(['/' + this.url + '/profile']);

  }
  myProfile() {
    if (localStorage.getItem('role_type') == "EX") {
      this.userid = localStorage.getItem('user_id');
      this.franchise.findOne({
        where: {
          "id": this.userid,
        }

      }).subscribe((res) => {
        var details = JSON.parse(JSON.stringify(res));

        this.dialogRef = this.dialog.open(ProfileSettingsComponent, {
          data: {
            franchisedetails: details
          },
          panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed().subscribe(result => {

          if (result != false && result != undefined) {
            // this.rows.push(result);
            this.ngOnInit();
          }

        });
      });
    } else {
      this.userid = localStorage.getItem('user_id');
      this.member.findOne({
        where: {
          "id": this.userid,
        }

      }).subscribe((res) => {
        var member = JSON.parse(JSON.stringify(res));

        this.dialogRef = this.dialog.open(ProfileSettingsComponent, {
          data: {
            memberdetails: member
          },
          panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed().subscribe(result => {

          if (result != false && result != undefined) {
            // this.rows.push(result);
            this.ngOnInit();
          }

        });
      });
    }

  }
  ngOnInit() {

    this.role_type = localStorage.getItem('role_type');

  }
  changePassword() {
    this.dialogRef = this.dialog.open(ChangePasswordComponent, {
      // data: {
      //   franchisedetails: details
      // },
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed().subscribe(result => {

      if (result != false && result != undefined) {
        // this.rows.push(result);
        this.ngOnInit();
      }

    });
  }

  redirect(pagename){  

      var company = localStorage.getItem('company_name');

      console.log("cccccccccccc",company + '/' + pagename)
      this.router.navigate([company + '/' + pagename]);  

      
  }

}
