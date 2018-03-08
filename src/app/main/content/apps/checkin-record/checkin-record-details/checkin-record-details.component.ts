import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';


@Component({
  selector: 'app-checkin-record-details',
  templateUrl: './checkin-record-details.component.html',
  styleUrls: ['./checkin-record-details.component.scss']
})
export class CheckinRecordDetailComponent implements OnInit {
	rows: any;
	member_id: any;
	franchise_id: any;
  checkin_id:any
  loadingIndicator = true;
  reorderable = true;
  checkin_details:any[];
  constructor(
  	private member: MemberApi,
    public memberCheckin : MemberCheckinApi,
    public checkin : CheckinApi,
     private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit() {
  	this.member_id=localStorage.getItem('user_id');
  	this.franchise_id=localStorage.getItem('franchise_id');
    this.route.params.subscribe(params => {
      this.checkin_id = params['id'];
    });
  	this.checkin.find({
  		where:{
        id:this.checkin_id
  		},
  		include:[{relation:"MemberCheckinType",scope:{
  			include:[{relation:"CheckInType"},{relation:"MemberCheckinTopic",scope:{
          include:[{"relation":"Topic"}]
        }}]
  		}}]
  	}).subscribe((res) => {
       var Data = JSON.parse(JSON.stringify(res));
      console.log('data',Data[0].MemberCheckinType)
      if(res.length>0){
      //this.rows = res[0];
        this.checkin_details=Data[0].MemberCheckinType;
      }
      else{
        
        this.checkin_details=[];
      }
      this.loadingIndicator=false;
    })
  	// this.memberCheckin.find({
  	// 	where:{
  	// 		member_id:this.member_id
  	// 	},
  	// 	order:""
  	// 	include:[{relation:"Checkin",scope:{
  	// 		where:{
  	// 			save_status:1
  	// 		},
  	// 		include:[{relation:"CreaterMember",scope:{
  	// 			include:["Role"]
  	// 		}},{relation:"CreaterFranchise",scope:{
  	// 			include:["Role"]
  	// 		}}]
  	// 	}}]
  	// }).subscribe((res) => {
   //    this.rows = res;
   //    console.log('data',res)

   //    this.rows.map((item: any) => {

   //    })
   //  })
  }

}
