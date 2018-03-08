import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CheckinApi, MemberCheckinApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-check-in-summary',
  templateUrl: './check-in-summary.component.html',
  styleUrls: ['./check-in-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckInSummaryComponent implements OnInit {
  
  @Input() checkin_sumary: any;
  //@Input() pipData: any;
  @Input() employee: any;
  
  @Input() selectedFirstTopicDetails : any;
  @Input() selectedSecondTopicDetails : any;
  @Input() selectedCheckinType : any;
  nextbutton = true; 
  back = false;
  MemberCheckInType: any = {}
  MemberCheckinTopicFirst: any;
  MemberCheckinTopicSecond: any
  
  subtopic_details = [];
  checkinData : any; 
  url_params : any;
  checkin_id:any;
  ack_button:any;
  message:any;
  checkinResult:any;

  constructor(private checkinApi: CheckinApi,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private memberCheckinApi: MemberCheckinApi
  ) {}


 /* ackButton(){
      console.log("this.ack_button: ", this.ack_button);
      if(this.ack_button == true){
        this.message = "Yes"
      }
      else{
        this.message = "No"
      }
  }*/

  ngOnInit() {
    this.ack_button=false;

    /* console.log("checkinSummary: ", this.checkin_sumary);
    console.log("checkinSummary: ", this.checkin_sumary["checkindata"])
    
    this.checkinData = this.checkin_sumary["checkindata"];
    //console.log("this.checkin_sumary", this.checkin_sumary[0].employee)
    //console.log("pipData:", this.pipData);
    for (var key in this.checkin_sumary.summary) {
      var value = this.checkin_sumary.summary[key]
      this.subtopic_details.push(value)

    }
 */
    
    let _params;
    this.route.params.subscribe(params => {
      _params = params['name'];
      this.url_params = params['name'];
    })
    console.log("this.url_params:", this.checkin_sumary, this.employee);
     //= params['name'];
    
    // console.log(this.subtopic_details, "********************")

    //finding details


    // if( this.employee.date != undefined){

      this.checkinApi.find({
        where:{
          "id": this.employee.checkin_id
        },
        include: ["MemberCheckin",
          {
            relation: "MemberCheckinType",
            scope:{
              include:["CheckInType",
              {
                relation:"MemberCheckinTopic",
                scope:{
                  include:"Topic"
                }
                
              }]
            }
          }],        
        order: 'checkin_date DESC',
        limit: 1
      }).subscribe((res) => {
          console.log("db res: ", res);
  
          if(res.length == 0){
            console.log("No Record!!!");
          }
          else if (res != undefined && res.length >= 1){
            var resjson = JSON.parse(JSON.stringify(res));
            console.log("resjson id: ", resjson[0].id);
            this.checkinResult = resjson[0];
            console.log("resjson:", resjson);
            this.checkin_id = resjson[0].id;
            this.MemberCheckInType = resjson[0].MemberCheckinType;
            if(this.MemberCheckInType[0] != undefined){
              console.log("this.MemberCheckInType[0]: ", this.MemberCheckInType[0]);
              this.MemberCheckinTopicFirst = this.MemberCheckInType[0].MemberCheckinTopic;
              console.log("this.MemberCheckinTopicFirst: ", this.MemberCheckinTopicFirst);
              
            }
            
            if(this.MemberCheckInType[1] != undefined){
              console.log("this.MemberCheckInType[1]: ", this.MemberCheckInType[1]);
              this.MemberCheckinTopicSecond =  this.MemberCheckInType[1].MemberCheckinTopic;
              console.log("this.MemberCheckinTopicSecond: ", this.MemberCheckinTopicSecond);
            }
          }
        }
      );
    // }

    // console.log("employee length: ", this.employee.selectedEmployeeLength);

  }


  //for manager and employee
  sendSummary() { 


    //send mail to both employee and manager
    this.checkinApi.sendSummaryMail({"checkin_id":this.checkin_id, "acknowledge": this.ack_button}).subscribe((res) => {        
    }); 


   var toast = this.snackBar.open('Successfully sent summary email! ', '', {
      duration: 2000
    }); 

    toast.afterDismissed().subscribe(() => {
      this.router.navigate(['/' + this.url_params + '/dashboards']); 
    });
   

  }


  //for employee
  //employeeSendSummary() {

    // console.log("checkinSummary: ", this.checkin_sumary.checkindata[0].employee.employee[0].id);
    /* var emp={name:this.checkin_sumary.checkindata[0].employee.employee[0].name,
            id:this.checkin_sumary.checkindata[0].employee.employee[0].id,
            date:this.checkin_sumary.checkindata[0].employee.date}
    this.checkin_sumary._employee=emp; */

    //console.log("employeeSendSummary: ");

    /*console.log("this.checkinResult_Id: ", this.checkinResult.id);
    console.log("this.checkinResult_MemberCheckin: ", this.checkinResult.MemberCheckin);
    this.checkinResult.MemberCheckin[0].ack_receive = 1;
    this.memberCheckinApi.updateAttributes(this.checkinResult.MemberCheckin[0].id,
      this.checkinResult.MemberCheckin[0]).subscribe((res) => {
        console.log("resOfMail: ", res );
        this.snackBar.open('Employee Confirmed! ', '', {
          duration: 3000
        });
      }); */


     /*this.memberCheckinApi.sendSummaryToEmployee({"checkin_id":this.checkin_sumary, "emp_ack_btn": this.message}).subscribe((res) => {
      this.snackBar.open('Employee Confirmed! ', '', {
        duration: 3000
      });
    }) */

 //}

}
