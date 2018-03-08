import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { StoreApi } from '../../../../../core/sdk/services/index';
import { RecapApi } from '../../../../../core/sdk/services/index';
import { CheckInTypeApi } from '../../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../../core/sdk/services/index';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'fuse-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuseProjectComponent implements OnInit, OnDestroy {
  select2: number = 1;
  select1: number = 1;
  total_emps: any;
  location: any;
  total_checkin: any;
  total_stores: any;
  total_recap: any;
  checkinDetailsEvent: any = [];
  memberCheckinDetails: any = [];
  memberCheckinTypeDetails: any = [];
  memberCheckinTopicFollowUpDate: any = [];
  memberCheckinTopicStartDate: any = [];
  memberCheckinTopicEndDate: any = [];
  memberCheckinTopicExpectedDate: any = [];
  memberCheckinClass: any = [];
  memberCheckinTags: any = [];
  memberCheckinTopics: any = [];
  memberCheckinTags2: any = [];
  memberDetailsId: any = [];
  top_tags: any = [];
  franchise_name: any;
  checkinDetails: any;
  checkin_coverage = 0;


  MemberCheckInType: any;
  MemberCheckInType_: any;
  back = false;
  MemberCheckinTopic: any;
  MemberCheckinTopicFirst: any;
  MemberCheckinTopicSecond: any;
  followup1: {} = {};

  dashboardsCheckinDetails: any[] = [];
  locations: any;
  toDayDate: any;
  priorDate: any;
  toDayDates : any;
  priorDates : any;
  memberIds = [];
  allmemberIds = [];
  rec_app: any = 0;
  corr_major: any = 0;
  corr_minor: any = 0;
  new_updates: any = 0;
  goals: any = 0;
  task: any = 0;
  total_rec_corr:any = 0;
  rec_ratio: any = 0;
  corr_minor_ratio : any = 0;
  corr_major_ratio : any = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private member: MemberApi,
    private store: StoreApi,
    private checkin: CheckinApi,
    private memberCheckin: MemberCheckinApi,
    private recap: RecapApi,
    private checkinType: CheckInTypeApi) {
    this.activatedRoute.params.subscribe(params => {
      let date = params['name'];
      this.franchise_name = params['name'];
      // console.log(date);
      // Print the parameter to the console.
    });
  }

  gotoCheckin(checkinid) {
    // console.log("checkinid: ", checkinid);

    var url = this.franchise_name + "/check-record/" + checkinid;
    // console.log("url: ", url);
    this.router.navigate([url]);
    //this.router.navigate([checkinid],{"relativeTo":this.activatedRoute});
  }


  getLocations(loc) {
    this.location = loc;
     this.getCheckinCoverage(this.priorDate, this.toDayDate, this.location.id)

    this.member.find({
      include: {
        relation: "Role",
        scope: {
          where: {
            or: [{ role_type: "D" }, { role_type: "M" }, { role_type: "S" }, { role_type: "EM" }]
          }
        }

      },
      where: {
        store_id: loc.id
      }
    }).subscribe((res) => {
      this.memberIds = [];
      if (res != undefined) {
        var resjson = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < resjson.length; i++) {
          this.memberIds.push(resjson[i].id);
        }
        this.getConversationByType(this.memberIds);
      }

    })


  }

  //function for getting conversation
  getConversationByType(Ids)
  {
    console.log("get Conversation By TYpe()...");
    console.log("IDs: ", Ids);
    console.log("priorDate: ", this.priorDate);
    console.log("toDayDat: ", this.toDayDate);
    this.priorDate.setHours(0,0,0,0);
    this.toDayDate.setHours(23,59,59,999)
    console.log("priorDate: ", this.priorDate);
    console.log("toDayDat: ", this.toDayDate);

    /* if(this.memberIds == undefined || this.memberIds.length==0){
      this.memberIds = this.allmemberIds;
    } else {
      this.memberIds = Ids;
    } */
    console.log("this.allmemberIds: ", this.allmemberIds);
    console.log("memberIDs: ", this.memberIds);
    this.checkin.find({
      where: {
        "checkin_date": { between: [this.priorDate, this.toDayDate] },
        "save_status": 1

      },
      include: [{
          relation: "MemberCheckin",
          /*  scope:{
          where:{
             "member_id" : [this.memberIds]
          }
        }  */
        },
        {
          relation: "MemberCheckinType",
          scope: {
            include: ["CheckInType",
              {
                relation: "MemberCheckinTopic",
                scope: {
                  include: "Topic"
                }
              }
            ]
          }
        }]
        ,
          //order: 'date DESC'
          order: 'checkin_date DESC',
          //limit: 1
        //order: 'date DESC'
        
      }).subscribe((res) => {
          this.new_updates =0;
          this.goals = 0;
          this.task = 0;
          this.corr_minor = 0;
          this.corr_major = 0;
          this.rec_app = 0;
          this.total_rec_corr = 0;
          console.log("bbb_checkinBYTYPE: ",res);
          var checkin_result = JSON.parse(JSON.stringify(res));
          for(var i = 0 ; i < checkin_result.length; i++){
            for(var j = 0; j < checkin_result[i].MemberCheckin.length; j++){
              console.log("id: ", checkin_result[i].MemberCheckin[j].member_id);
              //console.log("indes: ", 
              if((Ids).indexOf(checkin_result[i].MemberCheckin[j].member_id) >= 0 ){
                for( var k =0 ; k < 
                        checkin_result[i].MemberCheckinType.length; k++){
                    //console.log("checkin_name:" , 
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name 
                      == "Recognition & Appreciation")
                     {
                      this.rec_app = this.rec_app + 1;
                     }  
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name
                       == "Correction (Major)")
                     {
                      this.corr_major = this.corr_major + 1;
                     }
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name 
                      == "Correction (Minor)")
                     {
                      this.corr_minor = this.corr_minor + 1;
                     } 
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name 
                      == "Tasks")
                     {
                      this.task = this.task + 1;
                     } 
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name 
                      == "Goals")
                     {
                      this.goals = this.goals + 1;
                      //console.log("Goals: ", this.goals);
                     }
                    if(checkin_result[i].MemberCheckinType[k].CheckInType.checkin_name 
                      == "News & Updates")
                     {
                      this.new_updates = this.new_updates + 1;
                     }   
                }
             }
            }
          }
        
      

          /* console.log("new_updates: ", this.new_updates);
          console.log("Goals: ", this.goals);
          console.log("Tasks: ", this.task);
          console.log("corr_minor: ", this.corr_minor);
          console.log("corr_major: ", this.corr_major);
          console.log("rec_app: ", this.rec_app); */
          this.total_rec_corr = this.corr_minor + this.corr_major + this.rec_app;
          console.log("total_rec_corr: ", this.total_rec_corr);
          this.rec_ratio = this.rec_app/this.total_rec_corr;
          this.corr_minor_ratio  = this.corr_minor/this.total_rec_corr;
          this.corr_major_ratio = this.corr_major/this.total_rec_corr;
          console.log("rec_ratio: ", this.rec_ratio);
          console.log("corr_minor_ratio : ", this.corr_minor_ratio);
          console.log("corr_major_ration: ", this.corr_major_ratio);
      });

  }

  //get changed date
  selectDateConversation(value){
    console.log("value: ", value);
    this.priorDate = value;
    console.log("priorDate_change: ", this.priorDate);
    console.log("toDat_change: ", this.toDayDate);
    
    this.getConversationByType(this.memberIds);
  }

  getNoDays(){
    //console.log("select2:" , this.select2);
    //console.log("this.toDayDate: ",  this.toDayDate);
    if (this.select2 == 1) {
      //console.log("prior: ", new Date(new Date().setDate( this.toDayDate.getDate() - 7)));
      this.priorDate = new Date(new Date().setDate( this.toDayDate.getDate() - 7))
      this.priorDates = new Date(new Date().setDate( this.toDayDate.getDate() - 7))
    }
    else if(this.select2 == 2){
      //console.log("prior: ", new Date(new Date().setDate( this.toDayDate.getDate() - 30)));
      this.priorDate = new Date(new Date().setDate( this.toDayDate.getDate() - 30))
      this.priorDates = new Date(new Date().setDate( this.toDayDate.getDate() - 30))
    }


    console.log("priorDate: ", this.priorDate);
    console.log("toDat: ", this.toDayDate);

    this.getConversationByType(this.memberIds);
    
  }

  getCheckinCoverage(priorDate, toDayDate, loc) {
    console.log("aa", loc)

    // console.log("dd",toDayDate)
    let member_checkin_count = 0;
    let total_member = 0;
    var obj = {};
    if (loc == undefined) {
      obj = {
        where: {
          franchise_id: localStorage.getItem("franchise_id")
        }
      }
    } else {
      obj = {
        where: {
          franchise_id: localStorage.getItem("franchise_id"),
          store_id: loc
        }

      }
    }
    this.member.find(obj).subscribe((mem) => {

      if (mem != undefined) {
        total_member = mem.length;
        var member_data = JSON.parse(JSON.stringify(mem));
        member_data.map((users) => {
          this.memberDetailsId.push(users.id);
        });

        this.memberCheckin.find({
          where: {

            member_id: { inq: this.memberDetailsId }
          },
          include: {
            relation: "Checkin",
            scope: {

              where: {
                checkin_date: {
                  between: [this.priorDate, this.toDayDate]
                }
              }
            }
          }

        }).subscribe((mem_ckeckin) => {
          // console.log("bbbbbbbbb", mem_ckeckin);
          var member_checkin_data = JSON.parse(JSON.stringify(mem_ckeckin));
          member_checkin_data.map((_m) => {
            if (_m.Checkin) {
              member_checkin_count++;
            }
          });

          this.checkin_coverage = (member_checkin_count / total_member) * 100;

        });

      }
    });
  }

  ngOnInit() {

    this.toDayDates = new Date();
    //   rintu start

    // Check-in coverage
    this.getCheckinCoverage(this.priorDate, this.toDayDate, this.location)

    // Get active tags count

    this.checkin.find({
      where: {
        save_status: 1,
        created_by: localStorage.getItem("user_id")
      },
      include: [{
        relation: "MemberCheckinType",
        scope: {
          include: ["CheckInType", "MemberCheckinTopic"]

        }
      }],
      order: 'checkin_date DESC',


    }).subscribe((res) => {

      if (res != undefined) {
        var checkin_details = JSON.parse(JSON.stringify(res));
        checkin_details.map((checkin) => {
          console.log("membercheckin: ", checkin);
          if (checkin.MemberCheckinType != undefined) {
            checkin.MemberCheckinType.map((membercheckinType) => {
              // console.log("fffffffff: ", membercheckinType);
              this.memberCheckinTags.push(membercheckinType.CheckInType.id);
              // this.memberCheckinTopics.push(membercheckinType.MemberCheckinTopic.checkin_topic_id);
            })

          }
        })
        var counts = {};
        var c = [];
        for (var i = 0; i < this.memberCheckinTags.length; i++) {

          counts[this.memberCheckinTags[i]] = 1 + (counts[this.memberCheckinTags[i]] || 0);
        }


        for (var key in counts) {
          c.push({
            id: key,
            count: counts[key]
          })
        }


        var sortedArray = c.sort((a: any, b: any) => {
          if (a.count < b.count) {
            return 1;
          } else if (a.count > b.count) {
            return -1;
          } else {
            return 0;
          }
        });

        console.log("sortedArray", this.memberCheckinTopics);
        var top_3 = [];
        top_3.push(sortedArray[0].id)
        top_3.push(sortedArray[1].id)
        top_3.push(sortedArray[2].id)
        console.log("top_3", top_3);

        this.checkinType.find({
          where: {
            id: { inq: top_3 }
          }
        }).subscribe((res) => {

          var _d = JSON.parse(JSON.stringify(res));

          _d.map((checkin) => {
            for (var i = 0; i < sortedArray.length; i++) {

              if (sortedArray[i].id == checkin.id) {
                this.top_tags.push({
                  name: checkin.checkin_name,
                  count: sortedArray[i].count
                })

              } else {}

            }
          });

          // console.log("ddddddddddddddd", this.top_tags)

        });


      }


    })


    //  rintu end



    //this.toDayDate = new Date();
    //console.log("select2:" , this.select2);

    if (this.select2 == 1) {
      //console.log("prior: ", new Date(new Date().setDate( this.toDayDate.getDate() - 7)));
      this.priorDates = new Date(new Date().setDate( this.toDayDates.getDate() - 7))
    }
    else if(this.select2 == 2){
      //console.log("prior: ", new Date(new Date().setDate( this.toDayDate.getDate() - 30)));
      this.priorDates = new Date(new Date().setDate( this.toDayDates.getDate() - 30))
    }

    /* this.route.params.subscribe(params => {
      this.franchise_name = params['name'];
    }); */
    var user_count = 0;
    var checkin_count = 0;
    var store_count = 0;

    //taking total users under this director0
    this.member.find({
      include: {
        relation: "Role",
        scope: {
          where: {
            or: [{ role_type: "D" }, { role_type: "M" }, { role_type: "S" }, { role_type: "EM" }]
          }
        }

      },
      where: {
        franchise_id: localStorage.getItem('franchise_id'),
        is_delete: 0
      } 
    }).subscribe((res) => {
      this.allmemberIds = []
      var Data = JSON.parse(JSON.stringify(res));
      console.log("data: ", Data);
      Data.forEach((item) => {
        console.log("item: ", item);
        this.allmemberIds.push(item.id);
        if (item.Role != undefined) {
          user_count = user_count + 1;
        }
      });
      console.log("allmemberIds: " , this.allmemberIds);
      this.priorDate = this.priorDates;
      this.toDayDate = this.toDayDates;
      console.log("priorDate: ", this.priorDate);
      console.log("toDat: ", this.toDayDate);
      this.getConversationByType(this.allmemberIds);
      this.total_emps = user_count;

    });

    //taking all the store counts under this franchise
    this.store.find({
      where: {
        franchise_id: localStorage.getItem('franchise_id')
      }
    }).subscribe((res) => {

      console.log("Res: ", res);
      this.locations = res;
      this.total_stores = res.length;

    });


    //taking all the checkin counts under this franchise
    this.checkin.find({
      where: {
        franchise_id: localStorage.getItem('franchise_id'),
        save_status: 1
        //created_by: localStorage.getItem('user_id')
      }
    }).subscribe((res) => {

      // console.log("total_checkin", res)

      this.total_checkin = res.length;

    });



    //taking all the recap counts created by this member
    this.recap.find({
      where: {
        created_by: localStorage.getItem('franchise_id'),
        save_status: 1
      }
    }).subscribe((res) => {

      // console.log("total_recap", res)

      this.total_recap = res.length;

    });


    //recognition event (naveen)..............
    this.checkin.find({
      where: {
        save_status: 1,
        created_by: localStorage.getItem("user_id")
      },
      include: [{
          relation: "MemberCheckin",
          scope: {
            include: "Member"
          }
        },
        {
          relation: "MemberCheckinType",
          scope: {
            include: ["CheckInType", "MemberCheckinTopic"]

          }
        }
      ],
      //order: 'date DESC'
      order: 'checkin_date DESC',


    }).subscribe((res) => {
      if (res != undefined) {
        //console.log("recognition result: ", res);
        var checkin = JSON.parse(JSON.stringify(res));
        //console.log("savedCheckinDetails...: ", checkin);
        var checkindashborads: {} = {};
        if (checkin != undefined) {
          //console.log("savedCheckinDetails...: ", checkin);
          //console.log("savedCheckinDetails_length...: ", this.savedCheckinDetails.length);
          for (var i = 0; i < checkin.length; i++) {

            for (var j = 0; j < checkin[i].MemberCheckinType.length; j++) {

              for (var k = 0; k < checkin[i].MemberCheckinType[j].MemberCheckinTopic.length; k++) {



                for (var l = 0; l < checkin[i].MemberCheckin.length; l++) {

                  //console.log("Type: ",  
                  //checkin[i].MemberCheckinType[j].CheckInType.checkin_name);
                  //console.log("date: ", 
                  //checkin[i].MemberCheckinType[j].MemberCheckinTopic[k].follow_up_date);

                  //console.log("member:", checkin[i].MemberCheckin[l].Member.first_name);

                  checkindashborads = {
                    "checkin_id": checkin[i].id,
                    "checkin_name": checkin[i].MemberCheckinType[j].CheckInType.checkin_name,
                    "follow_up_date": checkin[i].MemberCheckinType[j].MemberCheckinTopic[k].follow_up_date,
                    "expected_date": checkin[i].MemberCheckinType[j].MemberCheckinTopic[k].expected_date,
                    "start_date": checkin[i].MemberCheckinType[j].MemberCheckinTopic[k].start_date,
                    "end_date": checkin[i].MemberCheckinType[j].MemberCheckinTopic[k].end_date,
                    "member": checkin[i].MemberCheckin[l].Member.first_name,

                  }

                  //console.log("checkindashborads: ", checkindashborads);

                  this.dashboardsCheckinDetails.push(checkindashborads);
                }
              }
            }
          }

          //console.log("dashboardsCheckinDetails: ", this.dashboardsCheckinDetails);
        }


      } else {
        console.log("NO");
      }
    })


  }

  ngOnDestroy() {}




}
