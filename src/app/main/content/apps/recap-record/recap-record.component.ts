import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemberApi } from '../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../core/sdk/services/index';
import { RecapApi } from '../../../../core/sdk/services/index';


@Component({
  selector: 'app-recap-record',
  templateUrl: './recap-record.component.html',
  styleUrls: ['./recap-record.component.scss']
})
export class RecapRecordComponent implements OnInit {
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
    private recap:RecapApi
    ) {

   }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.franchise_name = params['name'];
    });
  	this.member_id=localStorage.getItem('user_id');
  	this.franchise_id=localStorage.getItem('franchise_id');
  	this.recap.find({
  		order:"recap_date ASC",
  		where:{
        member_id:this.member_id,
        save_status:1
  		},
      include:[{relation:"CreaterMember",scope:{
          include:["Role"]
        }},{relation:"CreaterFranchise",scope:{
          include:["Role"]
        }}]
  	}).subscribe((res) => {
  		var data = JSON.parse(JSON.stringify(res));
  		console.log('data',data)
      this.loadingIndicator = false;
      this.rows=data;

    })
  }

  showRecapDetails(id){
  	// var url=this.franchise_name+"/check-record/"+id;
  	// this.router.navigate([url]);  
  	this.router.navigate([id],{"relativeTo":this.route});
  }

}
