import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../../core/sdk/services/index';
// import { CheckinApi } from '../../../../../core/sdk/services/index';
import { RecapApi } from   '../../../../../core/sdk/services/index';


@Component({
  selector: 'app-recap-list-details',
  templateUrl: './recap-list-details.component.html',
  styleUrls: ['./recap-list-details.component.scss']
})
export class RecapListDetailComponent implements OnInit {
	rows: any;
	member_id: any;
	franchise_id: any;
  recap_id:any
  loadingIndicator = true;
  reorderable = true;
  recap_details:any;
  strength_recap:any;
  strength_lifetime:any;
  oppurtunity_recap:any;
  oppurtunity_lifetime:any;
  completed_goal:any;
  incompleted_goal:any;
  completed_task:any;
  incompleted_task:any;

  constructor(
  	private member: MemberApi,
    public memberCheckin : MemberCheckinApi,
    public recap : RecapApi,
     private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit() {
  	this.member_id=localStorage.getItem('user_id');
  	this.franchise_id=localStorage.getItem('franchise_id');
    this.route.params.subscribe(params => {
      this.recap_id = params['id'];
    });
    this.recap_details={};
    this.strength_recap=[];
    this.strength_lifetime=[];
    this.oppurtunity_recap=[];
    this.oppurtunity_lifetime=[];
    this.completed_goal=[];
    this.incompleted_goal=[];
    this.completed_task=[];
    this.incompleted_task=[];
    this.recap.find({
      where:{
        id:this.recap_id,
      },
      include:[{"relation":"TopicCompletion",scope:{
        include:[{"relation":"Topic"}]
      }},{"relation":"StrenthOppurtunity",scope:{
        include:[{"relation":"Topic"}]
      }},{"relation":"Checkin"}]
    }).subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      console.log("details",data)
      if(data.length>0){

      this.recap_details=data[0];
      this.recap_details.StrenthOppurtunity.map((d) =>{
        console.log('data',d)
        if(d.type=='S'){
          if(d.period=='R'){
          this.strength_recap.push(d);

          }else{
            
          this.strength_lifetime.push(d);
          }
        }
        else if(d.type=='O'){
          if(d.period=='R'){
          this.oppurtunity_recap.push(d);
        }
        else{

          this.oppurtunity_lifetime.push(d);
        }
        }
        else{

        }
      })
      this.recap_details.TopicCompletion.map((d) =>{
        console.log('data',d)
        if(d.type=='G'){
          if(d.task_complete==1){

          this.completed_goal.push(d);
          }
          else{
            
          this.incompleted_goal.push(d);
          }
        }
        else if(d.type=='T'){
           if(d.task_complete==1){
          this.completed_task.push(d);
        }
        else{
          
          this.incompleted_task.push(d);
        }
        }
        else{

        }
      })
      }
      else{
        
      this.recap_details={};
      }

    })

  }

}
