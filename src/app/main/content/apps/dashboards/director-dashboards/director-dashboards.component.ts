import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { StoreApi } from '../../../../../core/sdk/services/index';

@Component({
  selector: 'app-director-dashboards',
  templateUrl: './director-dashboards.component.html',
  styleUrls: ['./director-dashboards.component.scss']
})
export class DirectorDashboardsComponent implements OnInit {


  total_emps:any;
  total_checkin:any;
  total_stores:any;
  constructor(private activatedRoute: ActivatedRoute,private member: MemberApi,private store:StoreApi, private checkin:CheckinApi ) {
    this.activatedRoute.params.subscribe(params => {
      let date = params['name'];
      console.log(date); // Print the parameter to the console. 
    });
  }


  ngOnInit() {

  	var user_count = 0;
  	var checkin_count = 0;
  	var store_count = 0;

  	//taking total users under this director
  	this.member.find({
  	  include:{
      	relation:"Role",
      	scope:{
      		where:{
      			or: [{ role_type:"M" },{ role_type:"S" },{ role_type:"EM" }]
      		}
      	}    		
      	
      },
      where: {        
        franchise_id: localStorage.getItem('franchise_id'),
        is_delete: 0
      }      
    }).subscribe((res) => {

    	var Data = JSON.parse(JSON.stringify(res));

    	Data.forEach((item) => {
    		if(item.Role != undefined){
	    		user_count = user_count + 1;    
	    	}
	    });

	    this.total_emps = user_count;      

    });


    //taking all the checkin counts under this franchise and this director(all the other under users)
  	this.checkin.find({  	
      include:{
        relation:"CreaterMember",
        scope:{
          include:{
            relation:"Role",
            scope:{
              where:{
                or: [{ role_type:"M" },{ role_type:"S" },{ role_type:"EM" }]
              }
            }
          }
        }
      },  
      where: {        
        franchise_id: localStorage.getItem('franchise_id'),
        save_status: 1
      }      
    }).subscribe((res) => {

      var Data = JSON.parse(JSON.stringify(res));
      Data.forEach((item) => {

          if(item.CreaterMember != undefined){
              if(item.CreaterMember.Role != undefined){
                  checkin_count = checkin_count + 1;
              }
          }

        	this.total_checkin = checkin_count; 
      });

    });

    //taking all the store counts under this franchise 
    this.store.find({
      where: {       
        franchise_id: localStorage.getItem('franchise_id'),        
      }
    }).subscribe((res) => {     
      this.total_stores = res.length;    

    });

	

  }

}
