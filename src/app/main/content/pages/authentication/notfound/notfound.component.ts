import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
 show_text=true;
 _url:any;
   constructor(
        private fuseConfig: FuseConfigService,
         private router: Router
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }

  ngOnInit() {
  	this._url=localStorage.getItem('url');
  	// console.log(_url)
  	if(this._url==null){
  		this.show_text=false;
  	}
  }

gotoDashboard(){
   this.router.navigate(['/' + this._url + '/dashboards']);
}
}
