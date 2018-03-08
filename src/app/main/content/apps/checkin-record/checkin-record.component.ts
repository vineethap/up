import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemberApi } from '../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../core/sdk/services/index';


@Component({
  selector: 'app-checkin-record',
  templateUrl: './checkin-record.component.html',
  styleUrls: ['./checkin-record.component.scss']
})
export class CheckinRecordComponent implements OnInit {
	rows: any[];
	member_id: any;
	franchise_id: any;
    loadingIndicator = true;
    reorderable = true;
	franchise_name:string;
  constructor(
  	private member: MemberApi,
    public memberCheckin : MemberCheckinApi,
    public checkin : CheckinApi,
    private router: Router,
    private route: ActivatedRoute,
    ) {

   }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.franchise_name = params['name'];
    });
  	this.member_id=localStorage.getItem('user_id');
  	this.franchise_id=localStorage.getItem('franchise_id');
  	this.checkin.find({
  		order:"checkin_date ASC",
  		where:{
  			franchise_id:this.franchise_id,
  			save_status:1
  		},
  		include:[{relation:"MemberCheckinType",scope:{
  			include:[{relation:"CheckInType"}]
  		}},{relation:"CreaterMember",scope:{
  				include:["Role"]
  			}},{relation:"CreaterFranchise",scope:{
  				include:["Role"]
  			}},{"relation":"MemberCheckin",scope:{
  			where:{
  				member_id:this.member_id
  			}
  		}}]
  	}).subscribe((res) => {
  		var Data = JSON.parse(JSON.stringify(res));
  		console.log('data',Data)
      this.loadingIndicator = false;
      this.rows=Data.filter((item: any) => {
      	if(item.MemberCheckin.length>0){
      		return item
      	}
      })
    })
  }

  showCheckinDetails(id){
  	var url=this.franchise_name+"/check-record/"+id;
  	// this.router.navigate([url]);  
  	this.router.navigate([id],{"relativeTo":this.route});
  }

}
