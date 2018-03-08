import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { CheckinApi, SaveAsTempApi, MemberCheckinApi, MemberCheckinTypeApi,
        MemberCheckinTopicApi} from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import {AccordionComponentComponent} from '../acc'
import { DatePipe } from '@angular/common';
//import { MySuperService } from 'app/main/content/apps/check-in/check-in.component';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationPageComponent implements OnInit {

  @Input() checkin_data: any;
  @Input() employee: any;
  @Input() selected_type: any;
  @Input() topic_main: any;
  @Input() selectedCheckinType : any;
  pip_topic_name: any;
  pip_notes:any;
  corrective_action_days: any
  topicTypeName: any
  pipDate: any
  @Input() informSelectedEmployee: any;
  @Input() back_enable: any;
  @Input()  selectedFirstTopicDetails: any
  @Input()  selectedSecondTopicDetails: any
  @Input() insertCheckinDetails:any;
  panelOpenState: boolean = false;
  back = false;
  _topics: any = [];
  checkin_details = {};
  selected = {};
  checkin_sumary = {};
  show_summary = false
  url_params : any;

  expecteddate1: {} = {};
  followup1: {}= {};
  startdate1: {} = {};
  enddate1: {} = {};
  minDate:{} = {};
  noteData: {} = {};
  checkInDetailsFinal: any;
  aboveBeyond : {} = {};
  misConduct : {} = {};
  followToDate : any;
  expectedToDate: any;
  startToDate : any
  startToDateSecond : any
  expecteddate_second : {} = {};
  followup_second: {}= {};
  startdate_second: {} = {};
  enddate_second: {} = {};
  minDate_second:{} = {};
  noteData_second: {} = {};
  checkInDetailsFinal_second: any;
  aboveBeyond_second : {} = {};
  misConduct_second : {} = {};
  followToDateSecond : any;
  expectedToDateSecond: any;

  employeeNumOne: any = false;
  finalSubmit: any = true
  //topicDetails: FormGroup;


  topicNameFirst : any = [];
  topicNameSecond : any = [];
  checkInDetailsSave : any = [];
  checkInDetailsSaveSecond : any = [];
  resDateString: {} = {};
  resDateString_second: {} = {};
  multiCheckinDate :any = [];
  multiCheckinDateSecond: any = []
  checInDetailsSaveDoc : any = {};
  checkIn: boolean = false;
  checkIn1: boolean = false;
  insertMemberCheckinDetails: any;
  insertMemberCheckinTopDetailsSecond: any;
  insertMemberCheckinTopDetailsFirst: any;
  insertMemberCheckinType: any
  topicName: any;
  //dateModel : any;
  insertedCheckinId : any;
  submittedCheckinId : any;
  checkinSaved : any = false ;
  index1:any
  passedData:any;
  passedDataSecond:any;
  membercheckinTypeResultIDs: any = [];
  comments: {} = {};
  comments_second: {} = {};
  groupEmployee: any = false;
  passData(i){

    this.passedData = i;
    //console.log(i)
    console.log("passedData: ", this.passedData);
  }

  passDataSecond(i){
    this.passedDataSecond = i;
    //console.log(i)
    console.log("passedDataSecond: ", this.passedDataSecond);
  }

  selectDate(startpicker, topic){
    console.log("startpicker: ", startpicker);
    //this.endpicker = startpicker
    this.minDate[topic] = startpicker;
    console.log("minDate: ", this.minDate);

  }

  /* selectDateSecond(startpicker, topic){
    console.log("startpicker: ", startpicker);
    //this.endpicker = startpicker
    this.minDate[topic] = startpicker;
    console.log("minDate: ", this.minDate);

  } */

  firststep = 0;
  Secondstep = 0;

  setFirstStep(index: number){
    console.log("index: ", index)
    this.firststep = index;
  }

  setSecondStep(index: number){
    console.log("index: ", index)
    this.Secondstep = index;
  }

  nextStepFirst(topic){
    this.firststep++;
    // first topic
    console.log("topic: ", topic);

   /*  console.log("followupdate1: ", this.followup1[topic.name]);
    console.log("expecteddate1: ", this.expecteddate1[topic.name]);
    console.log("startdate1: ", this.startdate1[topic.name]);
    console.log("enddate1: ", this.enddate1[topic.name]);

    console.log("misConduct: ", this.misConduct[topic.name]);
    console.log("aboveBeyond: ", this.aboveBeyond[topic.name]);
    console.log("aboveBeyond: ", this.noteData[topic.name]); */

    //console.log("boundaryNOtes: ", this.boundaryNotes);

    this.checkInDetailsFinal = {
        checkin_topic_id: topic.id,
        aboveBeyond: this.aboveBeyond[topic.name],
        misConduct: this.misConduct[topic.name],
        noteData: this.comments[topic.name],
        followup1 : this.followup1[topic.name],
        expecteddate1 :  this.expecteddate1[topic.name],
        startdate1: this.startdate1[topic.name],
        enddate1: this.enddate1[topic.name]
    };

    this.checkInDetailsSave.push(this.checkInDetailsFinal);

    console.log("this.firststep=", this.firststep);
    console.log("len: ", this.selectedCheckinType.length);


     /* if(this.firststep == this.selectedFirstTopicDetails.length){
      this.finalSubmit = false;
     }    */

     if(this.selectedCheckinType.length == 1){
      if(this.firststep == this.selectedFirstTopicDetails.length){
        this.finalSubmit = false;
      }
    }
    else if(this.selectedCheckinType.length == 2){
      if(this.Secondstep == this.selectedSecondTopicDetails.length){
        this.finalSubmit = false;
      }
    }


  }

  nextStepSecond(topic){
    this.Secondstep++;
    // first topic
    //console.log("topic: ", topic);
    /*  console.log("followupdate1: ", this.followup_second[topic.name]);
    console.log("expecteddate1: ", this.expecteddate_second[topic.name]);
    console.log("startdate1: ", this.startdate_second[topic.name]);
    console.log("enddate1: ", this.enddate_second[topic.name]);

    console.log("misConduct: ", this.misConduct_second[topic.name]);
    console.log("aboveBeyond: ", this.aboveBeyond_second[topic.name]);
    console.log("aboveBeyond: ", this.noteData_second[topic.name]); */

    //console.log("boundaryNOtes: ", this.boundaryNotes);

    this.checkInDetailsFinal_second = {
        checkin_topic_id: topic.id,
        aboveBeyond: this.aboveBeyond_second[topic.name],
        misConduct: this.misConduct_second[topic.name],
        noteData: this.comments_second[topic.name],
        followup1 : this.followup_second[topic.name],
        expecteddate1 :  this.expecteddate_second[topic.name],
        startdate1: this.startdate_second[topic.name],
        enddate1: this.enddate_second[topic.name]
    };

    this.checkInDetailsSaveSecond.push(this.checkInDetailsFinal_second);


    //console.log("checkInDetailsSaveSecond: ", this.checkInDetailsSaveSecond);

    //console.log("this.Secondstep=", this.Secondstep);
    //console.log("len: ", this.selectedCheckinType.length);

    if(this.selectedCheckinType.length == 1){
      if(this.firststep == this.selectedFirstTopicDetails.length){
        this.finalSubmit = false;
      }
    }
    else if(this.selectedCheckinType.length == 2){
      if(this.Secondstep == this.selectedSecondTopicDetails.length){
        this.finalSubmit = false;
      }
    }


  }

  prevStep(){
    this.firststep--;
  }

  /* toggleNav() {
    this.mySuperService.sidenav.toggle();
  } */

  constructor(
    private checkin: CheckinApi, public snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private saveAsTempApi :SaveAsTempApi,
    private memberCheckinTypeApi : MemberCheckinTypeApi, 
    private router: Router,
    // private memberCheckinTypeApi : MemberCheckinTypeApi,
    public datePipe: DatePipe, public memberCheckinApi : MemberCheckinApi,
    public memberCheckinTopicApi : MemberCheckinTopicApi) {
    this.checkin_details = this.checkin_data;
     this.selected = this.selected_type;
  }

  ngOnInit() {

    this.followToDate = new Date(this.employee.date);
    this.expectedToDate = new Date(this.employee.date);
    this.startToDate = new Date(this.employee.date);
    this.followToDateSecond = new Date(this.employee.date);
    this.expectedToDateSecond = new Date(this.employee.date);
    this.startToDateSecond = new Date(this.employee.date);
    console.log("employee.date: ",  this.employee.date);

    //console.log("selectedTopicDetails: ", this.selectedTopicDetails.length)



    //console.log("height: ", window.screen.height);
    //console.log("width: ", window.screen.width);

    //this.checkInComponent.getData1();
    //console.log("selectedTopicDetails: ", this.topic_main);
   /*  console.log("\n\n ....confirmation page...!");

    console.log("selectedFirstTopicDetails: ", this.selectedFirstTopicDetails);
    console.log("selectedSecondTopicDetails: ", this.selectedSecondTopicDetails);
    console.log("selectedCheckinType: ", this.selectedCheckinType);
    console.log("insertCheckinDetails: ", this.insertCheckinDetails); */

    //console.log("selectedTopicDetails: ", this.selectedTopicDetails);
    //console.log("selectedTopicDetails: ", this.selectedTopicDetails.length);

    /* if( this.insertMemberCheckinTopDetailsFirst.length == 1){
      this.employeeNumOne = true;
    }
    */

    //console.log("selected type Id: ", this.selected_type.type);
    //console.log("employee.date", this.employee.date);

    //console.log("employee: ", this.employee.employee);
    //console.log("employee: ", this.employee.employee.length);

    // Last CHeckin First..................................
    //console.log("type: ", this.selectedCheckinType[0].id);

    var num = 0;
    for(var k=0; k < this.selectedFirstTopicDetails.length; k++){

      //console.log("topic[ " +k +" ]", this.selectedFirstTopicDetails[k]);
      this.topicNameFirst.push(this.selectedFirstTopicDetails[k].name)

      if(this.selectedFirstTopicDetails[k].name != undefined){

        //console.log("this.selectedTopicDetails[0].id: " , this.selectedTopicDetails[k].id);
        //console.log("this.selectedTopicDetails[0].id: " , this.selectedTopicDetails[k].name);
        //var topic_name = this.selectedTopicDetails[k].name;

        this.checkin.getRecentCheckIn({
            "checkintype" : this.selectedCheckinType[0].id,
            "topicid" : this.selectedFirstTopicDetails[k].id,
            "user_id" : localStorage.getItem('user_id'),
            "employeeid" : this.employee.employee

            }).subscribe((res) => {
                  console.log("res1first:", res);

                  //console.log("step: ", this.step);
                  //console.log("res:", res.legt);
                  //console.log("len:", Object.keys(res).length);
                  this.checkIn = true;
                  if (res != null && res.length > 0 && res != undefined) {
                      for (var l=0 ; l< res.length; l++){

                        var checkinDate = this.datePipe.transform(res[l], 'MM/dd/yyyy');
                        //console.log("checkinDate: ", checkinDate);
                        console.log("topicnameif: ", this.resDateString)
                        this.multiCheckinDate[l] = checkinDate;
                        this.resDateString[num] = this.multiCheckinDate;
                      //}
                      }

                  }
                  else {
                      //console.log("topicnameelse: ", topic_name)
                      this.resDateString[num] = ["No CheckIn Found"];
                      //console.log("resDateString: " ,this.resDateString);
                      //this.resDateString.push("No Check In!!!");;
                      //this.checkIn = false;
                      //this.resDate = this.resDateString;
                  }

                  //console.log("this.resDateString: ", this.resDateString);
                  num = num + 1;
                  console.log("this.resDateString: ", this.resDateString);
              })
          }
    }
    //...................................

    // Last CHeckin Second..................................
    var num1 = 0;
    for(var k=0; k < this.selectedSecondTopicDetails.length; k++){

      //console.log("topic[ " +k +" ]", this.selectedSecondTopicDetails[k]);
    this.topicNameSecond.push(this.selectedSecondTopicDetails[k].name)

     if(this.selectedSecondTopicDetails[k].name != undefined &&
               this.selectedCheckinType[1]!= undefined){

        //console.log("this.selectedTopicDetails[0].id: " , this.selectedTopicDetails[k].id);
        //console.log("this.selectedTopicDetails[0].id: " , this.selectedTopicDetails[k].name);
        //var topic_name = this.selectedTopicDetails[k].name;

        this.checkin.getRecentCheckIn({
            "checkintype" : this.selectedCheckinType[1].id,
            "topicid" : this.selectedSecondTopicDetails[k].id,
            "user_id" : localStorage.getItem('user_id'),
            "employeeid" : this.employee.employee

            }).subscribe((res) => {
                  console.log("res1_second:", res);

                  //console.log("step: ", this.step);
                  //console.log("res:", res.legt);
                  //console.log("len:", Object.keys(res).length);
                  this.checkIn1 = true;
                  if (res != null && res.length > 0 && res != undefined) {
                    for (var l=0 ; l< res.length; l++){

                      //console.log("res2: ", res);
                      //if( Object.keys(res).length > 0) {
                        var checkinDate = this.datePipe.transform(res[l], 'MM/dd/yyyy');
                        //console.log("checkinDate: ", checkinDate);
                        //console.log("topicnameif: ", topic_name)
                        this.multiCheckinDateSecond[l] = checkinDate;
                        this.resDateString_second[num1] = this.multiCheckinDateSecond;

                      //}
                    }


                  }
                  else {
                      //console.log("topicnameelse: ", topic_name)
                      this.resDateString_second[num1] = "No CheckIn Found";
                      //console.log("resDateString: " ,this.resDateString);
                      //this.resDateString.push("No Check In!!!");;
                      //this.checkIn = false;
                      //this.resDate = this.resDateString;
                  }

                  //console.log("this.resDateString: ", this.resDateString);
                  num1 = num1 + 1;

              })
          }
    }
    //...................................


    console.log("topic NAme First: ", this.topicNameFirst)
    console.log("topic NAme Second: ", this.topicNameSecond)

    
    console.log("this.insertCheckinDetails: " , this.insertCheckinDetails);

    if(this.insertCheckinDetails != undefined){
      this.insertCheckinDetails = this.insertCheckinDetails;
      console.log("this.insertCheckinDetails: " , this.insertCheckinDetails);
    }
    else{
      this.insertCheckinDetails = {
        franchise_id : localStorage.getItem('franchise_id'),
        checkin_date : new Date(this.employee.date),
        save_status : 0,
        created_by : localStorage.getItem("user_id"),
        created_by_role_id : localStorage.getItem("role_id")
     }
    }

    console.log("this.insertCheckinDetails: " , this.insertCheckinDetails);


    //EMployeee
    if(this.informSelectedEmployee != undefined){
      this.informSelectedEmployee = this.informSelectedEmployee;
      console.log("informSelectedEmployee: ", this.informSelectedEmployee);
      if( this.informSelectedEmployee.length >=2 ){
        this.groupEmployee = true;
      }
      else{
        this.groupEmployee = false;
      }
    }
    console.log("this.groupEmployee: ", this.groupEmployee);
  }

  addNotes (data, value, topic){
    console.log("data: ", data);
    this.noteData[topic] = value;
  }

  addNotesSecond (data, value, topic){
    console.log("data: ", data);
    this.noteData_second[topic] = value;
  }

  checkinSave(){

    console.log("checkin save");
    //console.log("data:, ", this.checkInDetailsSave);

    //checkin save.........................................

    console.log("\n insertCheckinDetails:, ", this.insertCheckinDetails);


    this.checkin.create(this.insertCheckinDetails)
    .subscribe((data) => {
      //console.log("555666", data);
     /*  this.snackBar.open('checkin Saved Successfully', '', {
        duration: 2000
      }); */
      //console.log("checkinId: ", data.id);
      //this.submittedCheckinId = data.id ;
      this.insertedCheckinId = data.id ;

     //console.log("this.informSelectedEmployee: ", this.informSelectedEmployee);
      for(var i = 0; i < this.informSelectedEmployee.length; i++){

        this.insertMemberCheckinDetails = {
          checkin_id: data.id,
          member_id : this.informSelectedEmployee[i].id,
          ack_send: false,
          ack_receive : false,
          pulse_survey : 0,
          goal_achieved : false,
          task_completed : false
        }

      //Mmeber
      this.memberCheckinApi.create(this.insertMemberCheckinDetails).subscribe(
        (data) => {
        //console.log("memberResult: ", data)
        /* this.snackBar.open('member checkin Created Successfully', '', {
          duration: 2000
        }); */

        },
        /* (error) => {
            this.snackBar.open('Some Error member checkin Occured!', '', {
                  duration: 2000
                });
              } */
      )
    }
   //console.log("selected_type.length" , this.selectedCheckinType.length);


    //Checkin Type
    for(var p = 0; p < this.selectedCheckinType.length; p++){

      this.insertMemberCheckinType = {
        checkin_id: data.id,
        checkin_type_id : this.selectedCheckinType[p].id
      }

      this.memberCheckinTypeApi.create(this.insertMemberCheckinType).subscribe(
      (membercheckinTypeResult) => {
        //console.log("membercheckinTypeResult: ", membercheckinTypeResult)
        /* this.snackBar.open('member checkin type Created Successfully', '', {
          duration: 2000
        }); */

      console.log("membercheckinTypeResult: ", membercheckinTypeResult.id);
      this.membercheckinTypeResultIDs.push(membercheckinTypeResult.id);
      console.log("membercheckinTypeResultIDs: ", this.membercheckinTypeResultIDs)
      //---------------------------------------------
      console.log("length: ", this.membercheckinTypeResultIDs.length);

      if(this.membercheckinTypeResultIDs.length == 1){

        for(var i = 0; i < this.checkInDetailsSave.length; i++){
          console.log("topicidcheckInDetailsSave: ", this.checkInDetailsSave[i]);
          //console.log("topicid: ", this.checkInDetailsSave[i].checkin_topic_id);
          //console.log("topicid: ", this.checkInDetailsSave[i].startdate1);
          //console.log("topicid: ", this.checkInDetailsSave[i].noteData);
          console.log("this.membercheckinTypeResultIDs[0].id:",  this.membercheckinTypeResultIDs[0].id);

          this.insertMemberCheckinTopDetailsFirst = {
            member_checkin_id: this.membercheckinTypeResultIDs[0],
            checkin_topic_id : this.checkInDetailsSave[i].checkin_topic_id,
            above_beyond : this.checkInDetailsSave[i].aboveBeyond,
            misconduct : this.checkInDetailsSave[i].misConduct,
            comments: this.checkInDetailsSave[i].noteData,
            start_date : this.checkInDetailsSave[i].startdate1,
            end_date: this.checkInDetailsSave[i].enddate1,
            expected_date : this.checkInDetailsSave[i].expecteddate1,
            follow_up_date : this.checkInDetailsSave[i].followup1
          }

          //console.log("insertMemberCheckinDetails: ", this.insertMemberCheckinDetails );
          console.log("insertMemberCheckinTopDetailsFirst: ", this.insertMemberCheckinTopDetailsFirst );

          //Mmeber
          this.memberCheckinTopicApi.create(this.insertMemberCheckinTopDetailsFirst).
              subscribe((data) => {
                    //console.log("memberResultTopic: ", data)
                    /* this.snackBar.open('Checkin Saved Successfully', '', {
                      duration: 2000
                    }); */
                  },
                  (error) => {
                    this.snackBar.open('Some Error Occured!', '', {
                        duration: 2000
                    });
                  }
                )
          }//------------------------------------
      }

      if(this.membercheckinTypeResultIDs.length == 2){

        console.log("this.membercheckinTypeResultIDs[1].id:",
        this.membercheckinTypeResultIDs[1].id);

          // second topic ..............................
          console.log("checkInDetailsSaveSecond: ", this.checkInDetailsSaveSecond);

          for(var i = 0; i < this.checkInDetailsSaveSecond.length; i++){
            //console.log("topicid: ", this.checkInDetailsSave[i]);
            //console.log("topicid: ", this.checkInDetailsSave[i].checkin_topic_id);
            //console.log("topicid: ", this.checkInDetailsSave[i].startdate1);
            //console.log("topicid: ", this.checkInDetailsSaveSecond[i].noteData);

            this.insertMemberCheckinTopDetailsSecond = {
                member_checkin_id:  this.membercheckinTypeResultIDs[1],
                checkin_topic_id : this.checkInDetailsSaveSecond[i].checkin_topic_id,
                above_beyond : this.checkInDetailsSaveSecond[i].aboveBeyond,
                misconduct : this.checkInDetailsSaveSecond[i].misConduct,
                comments: this.checkInDetailsSaveSecond[i].noteData,
                start_date : this.checkInDetailsSaveSecond[i].startdate1,
                end_date: this.checkInDetailsSaveSecond[i].enddate1,
                expected_date : this.checkInDetailsSaveSecond[i].expecteddate1,
                follow_up_date : this.checkInDetailsSaveSecond[i].followup1
              }

              console.log("insertMemberCheckinDetailsSecond: ", this.insertMemberCheckinTopDetailsSecond);
              //Mmeber
              this.memberCheckinTopicApi.create(this.insertMemberCheckinTopDetailsSecond).subscribe(
                  (data) => {
                    //console.log("memberResult: ", data)
                    /* this.snackBar.open('Checkin Saved Successfully', '', {
                      duration: 2000
                    }); */
                  },
                  (error) => {
                    this.snackBar.open('Some Error Occured!', '', {
                      duration: 2000
                    });
                  }
              )
          }


        //ends here................................

      }
      var toast = this.snackBar.open('Checkin Saved Successfully', '', {
        duration: 2000
      });

      toast.afterDismissed().subscribe(() => {
          this.router.navigate(['/' + this.url_params + '/dashboards']); 
        });

    },
    (error) => {
          this.snackBar.open('Some Error Occured!', '', {
                duration: 2000
              });
            }
    )

  }

  /* if(this.membercheckinTypeResultIDs[1] != undefined){
    console.log("membercheckinTypeResultIDs: ", this.membercheckinTypeResultIDs)
    console.log("membercheckinTypeResultIDs: ", this.membercheckinTypeResultIDs.length)
  } */

  }, (error) => {

  this.snackBar.open('Some Error Occured!', '', {
    duration: 2000
  });

  });


    this.checkinSaved = true;
    //ends here........................................



  }

  checkinSubmit(){

    console.log("checkin submit");
    console.log("insertCheckinDetails:", this.insertCheckinDetails);
    console.log("selectedCheckinType: ", this.selectedCheckinType);




    if(this.insertCheckinDetails != undefined)
    {
      this.insertCheckinDetails.save_status =  1;
    }


    //checkin creation.........................................

    //console.log("this.checkinSaved: ", this.checkinSaved);
    if(this.checkinSaved == false){

      this.checkin.create(this.insertCheckinDetails)
        .subscribe((data) => {
      //console.log("555666", data);
      /* this.snackBar.open('checkin Created Successfully', '', {
        duration: 2000
      }); */
      //console.log("checkinId: ", data.id);
      this.submittedCheckinId = data.id ;
      this.employee['checkin_id'] = data.id;
      //console.log("this.informSelectedEmployee: ", this.informSelectedEmployee);
      for(var i = 0; i < this.informSelectedEmployee.length; i++){

        this.insertMemberCheckinDetails = {
          checkin_id: data.id,
          member_id : this.informSelectedEmployee[i].id,
          ack_send: false,
          ack_receive : false,
          pulse_survey : "0",
          goal_achieved : false,
          task_completed : false
        }
        //Mmeber
        this.memberCheckinApi.create(this.insertMemberCheckinDetails).subscribe(
          (data) => {
          //console.log("memberResult: ", data)
          /* this.snackBar.open('member checkin Created Successfully', '', {
            duration: 2000
          }); */
          },
          (error) => {
              this.snackBar.open('Some Error Occured!', '', {
                    duration: 2000
                  });
                }
        )
      }
       //console.log("selected_type.length" , this.selectedCheckinType.length);


       //Checkin Type
       for(var p = 0; p < this.selectedCheckinType.length; p++){

          this.insertMemberCheckinType = {
            checkin_id: data.id,
            checkin_type_id : this.selectedCheckinType[p].id
          }


        /* this.memberCheckinTypeApi.create(this.insertMemberCheckinType).toPromise().
          then(response => {
            console.log("response" , response);
            this.membercheckinTypeResultIDs.push(response.id);

          }) */


        this.memberCheckinTypeApi.create(this.insertMemberCheckinType).subscribe(
          (membercheckinTypeResult) => {
            //console.log("membercheckinTypeResult: ", membercheckinTypeResult)
            /* this.snackBar.open('member checkin type Created Successfully', '', {
              duration: 2000
            }); */

          console.log("membercheckinTypeResult: ", membercheckinTypeResult.id);
          this.membercheckinTypeResultIDs.push(membercheckinTypeResult.id);
          //---------------------------------------------
          console.log("length: ", this.membercheckinTypeResultIDs.length);

          if(this.membercheckinTypeResultIDs.length == 1){

            for(var i = 0; i < this.checkInDetailsSave.length; i++){
              //console.log("topicid: ", this.checkInDetailsSave[i]);
              //console.log("topicid: ", this.checkInDetailsSave[i].checkin_topic_id);
              //console.log("topicid: ", this.checkInDetailsSave[i].startdate1);
              //console.log("topicid: ", this.checkInDetailsSave[i].noteData);

              this.insertMemberCheckinTopDetailsFirst = {
                member_checkin_id: this.membercheckinTypeResultIDs[0],
                checkin_topic_id : this.checkInDetailsSave[i].checkin_topic_id,
                above_beyond : this.checkInDetailsSave[i].aboveBeyond,
                misconduct : this.checkInDetailsSave[i].misConduct,
                comments: this.checkInDetailsSave[i].noteData,
                start_date : this.checkInDetailsSave[i].startdate1,
                end_date: this.checkInDetailsSave[i].enddate1,
                expected_date : this.checkInDetailsSave[i].expecteddate1,
                follow_up_date : this.checkInDetailsSave[i].followup1
              }

              console.log("insertMemberCheckinTopDetailsFirst: ", this.insertMemberCheckinTopDetailsFirst );
              //Mmeber
              this.memberCheckinTopicApi.create(this.insertMemberCheckinTopDetailsFirst).
                  subscribe((data) => {
                    //this.show_summary = true;
                      if(this.selectedCheckinType.length == 1){
                        this.show_summary = true;
                      }
                      else{
                        this.show_summary = false;
                      }
                        //console.log("memberResultTopic: ", data)
                       /*  this.snackBar.open('Checkin Saved Successfully', '', {
                          duration: 2000
                        }); */
                      },
                      (error) => {
                        this.snackBar.open('Some Error Occured!', '', {
                            duration: 2000
                        });
                      })
              }//------------------------------------
          }

          if(this.membercheckinTypeResultIDs.length == 2){

              // second topic ..............................
              console.log("checkInDetailsSaveSecond: ", this.checkInDetailsSaveSecond);

              for(var i = 0; i < this.checkInDetailsSaveSecond.length; i++){
                console.log("above_beyond: ", this.checkInDetailsSave[i].aboveBeyond);
                //console.log("topicid: ", this.checkInDetailsSave[i].checkin_topic_id);
                //console.log("topicid: ", this.checkInDetailsSave[i].startdate1);
                //console.log("topicid: ", this.checkInDetailsSaveSecond[i].noteData);

                this.insertMemberCheckinTopDetailsSecond = {
                    member_checkin_id:   this.membercheckinTypeResultIDs[1],
                    checkin_topic_id : this.checkInDetailsSaveSecond[i].checkin_topic_id,
                    above_beyond : this.checkInDetailsSaveSecond[i].aboveBeyond,
                    misconduct : this.checkInDetailsSaveSecond[i].misConduct,
                    comments: this.checkInDetailsSaveSecond[i].noteData,
                    start_date : this.checkInDetailsSaveSecond[i].startdate1,
                    end_date: this.checkInDetailsSaveSecond[i].enddate1,
                    expected_date : this.checkInDetailsSaveSecond[i].expecteddate1,
                    follow_up_date : this.checkInDetailsSaveSecond[i].followup1
                  }

                  console.log("insertMemberCheckinTopDetailsSecond: ", this.insertMemberCheckinTopDetailsSecond);
                  //Mmeber
                  this.memberCheckinTopicApi.create(this.insertMemberCheckinTopDetailsSecond).subscribe(
                      (data) => {
                        //console.log("memberResult: ", data)
                        if(this.selectedCheckinType.length == 2){
                          this.show_summary = true;
                        }

                       /*  this.snackBar.open('Checkin Submitted Successfully', '', {
                          duration: 2000
                        }); */
                      },
                      (error) => {
                        this.snackBar.open('Some Error Occured!', '', {
                          duration: 2000
                        });
                      }
                  )
              }


            //ends here................................

          }

          this.snackBar.open('Checkin Submitted Successfully', '', {
            duration: 2000
          });

        },
        (error) => {
              this.snackBar.open('Some Error Occured!', '', {
                    duration: 2000
                  });
                }
        )

      }

      /* if(this.membercheckinTypeResultIDs[1] != undefined){
        console.log("membercheckinTypeResultIDs: ", this.membercheckinTypeResultIDs)
        console.log("membercheckinTypeResultIDs: ", this.membercheckinTypeResultIDs.length)
      } */

      }, (error) => {

      this.snackBar.open('Some Error Occured!', '', {
        duration: 2000
      });

      });


    }
    else{
      //
      this.checkin.patchAttributes(this.insertedCheckinId, this.insertCheckinDetails)
        .subscribe((data) => {
          this.show_summary = true;
          console.log("555666", data);
        this.snackBar.open('Checkin Submitted Successfully', '', {
          duration: 2000
        });
      });

    }

    //ends here........................................
    /* console.log("checkInDetailsSave: " , this.checkInDetailsSave);
      this.checInDetailsSaveDoc = { "checkindata": this.checkInDetailsSave }*/


  }

  saveCheckin(topic) {

    /* this.checkin.find({ where: { "id": this.checkin_data.id } }).subscribe((res: any) => {
      var data = res[0];
      this.cardValidate(data.summary, data);
    }) */

  }

  backClicked() {
    this.back = true;
  }

  cardValidate(summary, data) {

    var random_array = [];
    var key = Object.keys(summary);

    if (key.length > 0) {
      var flag = true;

      for (var _key in summary) {
        var value = summary[_key];
        console.log(value)
        if (!value.hasOwnProperty('notes')) {

          random_array.push(value);

        } else {

        }

      }
      if (random_array.length > 0) {
        this.snackBar.open('Please rate all the subtopic you have selected', '', {
          duration: 2000
        });
      } else {
        this.checkin_sumary = data;
        this.checkin_sumary["pip_topic_name"] = this.pip_topic_name;
        this.checkin_sumary["pip_notes"] = this.pip_notes
        this.checkin_sumary["corrective_action_days"] = this.corrective_action_days
        this.checkin_sumary["topicTypeName"] = this.topicTypeName
        this.checkin_sumary["pipDate"] = this.pipDate
        console.log("checkin_sumary: ", this.checkin_sumary);
        this.show_summary = true;
      }


    } else {
      // cb(false);
    }



  }

}
