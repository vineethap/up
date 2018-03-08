import { Component, OnInit,  Input ,ViewEncapsulation } from '@angular/core';
import { CheckinApi, MemberCheckinTopicApi} from '../../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-saved-confirmation-page',
  templateUrl: './saved-confirmation-page.component.html',
  styleUrls: ['./saved-confirmation-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SavedConfirmationPageComponent implements OnInit {
  
  nextbutton1 : boolean = true;
  //thisObj = false;;
  MemberCheckInType :any;
  MemberCheckInType_ : any;
  back = false;
  MemberCheckinTopic: any;
  MemberCheckinTopicFirst: any;
  MemberCheckinTopicSecond: any;
  @Input() savedCheckinDetails;
  @Input() employee;

  followup1: {} = {};
  expecteddate1: {} = {};
  startdate1: {} = {};
  aboveBeyond: {} = {};
  misConduct: {} = {};
  enddate1:{} = {};
  minDate:{} = {}
  noteData: {} = {};
  checkInDetailsFinal: any;
  checkInDetailsSave : any = [];
  finalSubmit: any = true
  checkinSaved : any = false ;

  expecteddate_second : {} = {};
  followup_second: {}= {};
  startdate_second: {} = {};
  enddate_second: {} = {};
  minDateSecond:{} = {};
  noteData_second: {} = {};
  checkInDetailsFinal_second: any;
  aboveBeyond_second : {} = {};
  misConduct_second : {} = {};
  checkInDetailsSaveSecond : any = []; 
  show_summary = false;
  insertMemberCheckinTopDetailsSecond: any;
  insertMemberCheckinTopDetailsFirst: any;

  followToDate : any;
  expectedToDate : any;
  startToDate : any;
  followToDateSecond : any;
  expectedToDateSecond : any;
  startToDateSecond : any;
  url_params : any;

  constructor(public checkinApi : CheckinApi,  public memberCheckinTopicApi : MemberCheckinTopicApi,
    private router: Router, public matSnackBar : MatSnackBar) { }

  selectDate(startpicker, topic){
    //console.log("startpicker: ", startpicker);
    //this.endpicker = startpicker
    this.minDate[topic] = startpicker;
    //console.log("minDate: ", this.minDate);
   
  }
  
  selectDateSecond(startpicker, topic){
    //console.log("startpicker: ", startpicker);
    //this.endpicker = startpicker
    this.minDateSecond[topic] = startpicker;
    //console.log("minDate: ", this.minDate);
   
  }

  firststep = 0;
  Secondstep = 0;

  addNotes (data, value, i){
    console.log("data: ", data);
    this.noteData[i] = value;
  }


  addNotesSecond (data, value, i){
    console.log("data: ", data);
    this.noteData_second[i] = value;
  }


  setFirstStep(index: number){
    console.log("index: ", index)
    this.firststep = index;
  } 
  
  setSecondStep(index: number){
    console.log("index: ", index)
    this.Secondstep = index;
  }
  

  nextStepFirst(i, topic){
    this.firststep++;
    // first topic 
   /*  console.log("i: ", i);
    console.log("topic: ", topic.Topic.id);
    console.log("followupdate1: ", this.followup1[i]);
    console.log("expecteddate1: ", this.expecteddate1[i]);
    console.log("startdate1: ", this.startdate1[i]);
    console.log("enddate1: ", this.enddate1[i]); 

    console.log("misConduct1: ", this.misConduct[i]);
    console.log("aboveBeyond1: ", this.aboveBeyond[i]);
    console.log("noteData: ", this.noteData[i]);  */
  
    //console.log("boundaryNOtes: ", this.boundaryNotes);
    
    this.checkInDetailsFinal = {
        aboveBeyond: this.aboveBeyond[i],
        misConduct: this.misConduct[i],
        noteData: topic.comments,
        followup1 : this.followup1[i],
        expecteddate1 :  this.expecteddate1[i],
        startdate1: this.startdate1[i],
        enddate1: this.enddate1[i]
    };

    this.checkInDetailsSave.push(this.checkInDetailsFinal);

    console.log("checkInDetailsSave: ", this.checkInDetailsSave);

    console.log("this.firststep=", this.firststep);
    console.log("len: ", this.MemberCheckInType_.length);

     /* if(this.firststep == this.selectedFirstTopicDetails.length){
      this.finalSubmit = false;
     }    */
     console.log("MemberCheckInType_: ", this.MemberCheckInType_);
     if(this.MemberCheckInType_.length == 1){
      if(this.firststep == this.MemberCheckinTopicFirst.length){
        this.finalSubmit = false;
      } 
    }
    else if(this.MemberCheckInType_.length == 2){
      if(this.Secondstep == this.MemberCheckinTopicSecond.length){
        this.finalSubmit = false;
      } 
    }
  }

  nextStepSecond(i, topic){
    this.Secondstep++;
    // first topic 
    /* console.log("i: ", i);
    console.log("topic: ", topic.Topic.id);
    console.log("followupdate2: ", this.followup_second[i]);
    console.log("expecteddate2: ", this.expecteddate_second[i]);
    console.log("startdate2: ", this.startdate_second[i]);
    console.log("enddate2: ", this.enddate_second[i]); 

    console.log("misConduct2: ", this.misConduct_second[i]);
    console.log("aboveBeyond2: ", this.aboveBeyond_second[i]);
    console.log("noteData_second2: ", this.noteData_second[i]);  */
  
    //console.log("boundaryNOtes: ", this.boundaryNotes);
    
    this.checkInDetailsFinal_second = {
        aboveBeyond: this.aboveBeyond_second[i],
        misConduct: this.misConduct_second[i],
        noteData: topic.comments,
        followup1 : this.followup_second[i],
        expecteddate1 :  this.expecteddate_second[i],
        startdate1: this.startdate_second[i],
        enddate1: this.enddate_second[i]
    };

    this.checkInDetailsSaveSecond.push(this.checkInDetailsFinal_second);


    console.log("checkInDetailsSaveSecond: ", this.checkInDetailsSaveSecond);

    //console.log("this.Secondstep=", this.Secondstep);
    //console.log("len: ", this.selectedCheckinType.length);

    if(this.MemberCheckInType_.length == 1){
      if(this.firststep == this.MemberCheckinTopicFirst.length){
        this.finalSubmit = false;
      } 
    }
    else if(this.MemberCheckInType_.length == 2){
      if(this.Secondstep == this.MemberCheckinTopicSecond.length){
        this.finalSubmit = false;
      } 
    }
    
    
  }
  

  ngOnInit() {

    this.followToDate = new Date(this.employee.date);
    this.expectedToDate = new Date(this.employee.date);
    this.startToDate = new Date(this.employee.date);
    this.followToDateSecond = new Date(this.employee.date);
    this.expectedToDateSecond = new Date(this.employee.date);
    this.startToDateSecond = new Date(this.employee.date);
    console.log("hhhhh")
    console.log("savedCheckinDetails...: ", this.savedCheckinDetails);
    if(this.savedCheckinDetails != undefined){

      console.log("savedCheckinDetails...: ", this.savedCheckinDetails);
      //console.log("savedCheckinDetails_length...: ", this.savedCheckinDetails.length);
      this.MemberCheckInType_ = this.savedCheckinDetails.MemberCheckinType;
      console.log("result...")
      console.log("MemberCheckInType_: ", this.MemberCheckInType_);
      console.log("MemberCheckInType_Length: ", this.MemberCheckInType_.length);
      console.log("result1..")
      //First Checkin Type
      if(this.MemberCheckInType_[0] != undefined){
        this.MemberCheckinTopicFirst = this.MemberCheckInType_[0].MemberCheckinTopic;
        console.log("MemberCheckinTopicFirst: ", this.MemberCheckinTopicFirst);
        for(var i=0; i < this.MemberCheckinTopicFirst.length; i++){
          //this.followup1[MemberCheckinTopicFirst[i]].follow_up_date;
          //console.log("topics", this.MemberCheckinTopicFirst[i].Topic.topic_name)

          if(this.MemberCheckInType_[0].CheckInType.checkin_name == 
                'Recognition & Appreciation'){ 
                  
                if(this.MemberCheckinTopicFirst[i].above_beyond == 0){
                  this.aboveBeyond[i] = false;
                }
                else if(this.MemberCheckinTopicFirst[i].above_beyond == 1){
                  this.aboveBeyond[i] = true;
                }

          }

          if(this.MemberCheckInType_[0].CheckInType.checkin_name == 
            'Correction (Major)'){ 

            if(this.MemberCheckinTopicFirst[i].misconduct == 0){
              this.misConduct[i] = false;
            }
            else if(this.MemberCheckinTopicFirst[i].misconduct == 1){
              this.misConduct[i] = true;
            }
            this.expecteddate1[i] = this.MemberCheckinTopicFirst[i].expected_date;
          }

          //console.log("aboveBeyond: ", this.aboveBeyond);

          this.followup1[i] = 
                  this.MemberCheckinTopicFirst[i].follow_up_date; 

        

          if(this.MemberCheckInType_[0].CheckInType.checkin_name =='News & Updates' || 
                    this.MemberCheckInType_[0].CheckInType.checkin_name=='Tasks'|| 
                    this.MemberCheckInType_[0].CheckInType.checkin_name =='Goals'){

              this.startdate1[i] = this.MemberCheckinTopicFirst[i].start_date; 
              this.enddate1[i] = this.MemberCheckinTopicFirst[i].end_date; 
          }

       
          /*  console.log("startdate1: ", new Date (this.startdate1[i]).getDate() +
          " " + new Date (this.startdate1[i]).getMonth() + " " + 
            new Date (this.startdate1[i]).getFullYear()); */

          
            console.log("enddate1: ", this.enddate1[i]);
            console.log("startdate1: ", this.startdate1[i]);
        }

      }

      
      //Second checkinType..........................
      if(this.MemberCheckInType_[1] != undefined){
        this.MemberCheckinTopicSecond =  this.MemberCheckInType_[1].MemberCheckinTopic;
        console.log("MemberCheckinTopicSecond: ", this.MemberCheckinTopicSecond);
   
        for(var i=0; i < this.MemberCheckinTopicSecond.length; i++){
          //this.followup1[MemberCheckinTopicFirst[i]].follow_up_date;
          //console.log("topics2", this.MemberCheckinTopicSecond[i].Topic.topic_name)

          if(this.MemberCheckInType_[1].CheckInType.checkin_name == 
            'Recognition & Appreciation'){
              if(this.MemberCheckinTopicSecond[i].above_beyond == 0){
                this.aboveBeyond_second[i] = false;
              }
              else if(this.MemberCheckinTopicSecond[i].above_beyond == 1){
                this.aboveBeyond_second[i] = true;
              }
          } 

          if(this.MemberCheckInType_[1].CheckInType.checkin_name == 
            'Correction (Major)'){ 
            
            if(this.MemberCheckinTopicSecond[i].misconduct == 0){
              this.misConduct_second[i] = false;
            }
            else if(this.MemberCheckinTopicSecond[i].misconduct == 1){
              this.misConduct_second[i] = true;
            } 
            
            this.expecteddate_second[i] = this.MemberCheckinTopicSecond[i].expected_date; 

          }

          //console.log("misConduct_second: ", this.misConduct_second);

          this.followup_second[i] = 
                  this.MemberCheckinTopicSecond[i].follow_up_date; 

          if(this.MemberCheckInType_[1].CheckInType.checkin_name =='News & Updates' || 
                  this.MemberCheckInType_[1].CheckInType.checkin_name=='Tasks'|| 
                  this.MemberCheckInType_[1].CheckInType.checkin_name =='Goals'){

            
              this.startdate_second[i] = this.MemberCheckinTopicSecond[i].start_date; 
              this.enddate_second[i] = this.MemberCheckinTopicSecond[i].end_date; 
              //console.log("enddate1: ", this.enddate1[i]);
          }
        

          /*  console.log("startdate1: ", new Date (this.startdate1[i]).getDate() +
         " " + new Date (this.startdate1[i]).getMonth() + " " + 
          new Date (this.startdate1[i]).getFullYear()); */

        
        }
      } 
    }
         
    if(this.employee != undefined){
      console.log("employee...: ", this.employee);
    }


  
  }



  checkinSave(){

    console.log("checin save...");

    this.checkinApi.patchAttributes(this.savedCheckinDetails[0].id, {save_status : 0})
    .subscribe(
      data => {
        console.log("Checkin Data: ", data);


        console.log("this.MemberCheckinTopicFirst",this.MemberCheckinTopicFirst)

       /*  this.matSnackBar.open("Saved Successfully...", "", {
          duration: 2000,
        });  */
      //First Topic Set
      if(this.MemberCheckinTopicFirst != undefined){

        for(var i=0; i < this.MemberCheckinTopicFirst.length; i++){
          this.insertMemberCheckinTopDetailsFirst = {
          above_beyond : this.checkInDetailsSave[i].aboveBeyond,
          misconduct : this.checkInDetailsSave[i].misConduct,
          comments: this.checkInDetailsSave[i].noteData,
          start_date : this.checkInDetailsSave[i].startdate1,
          end_date: this.checkInDetailsSave[i].enddate1,
          expected_date : this.checkInDetailsSave[i].expecteddate1,
          follow_up_date : this.checkInDetailsSave[i].followup1
        }

        console.log("this.MemberCheckinTopicFirst[i].id: ", 
          this.MemberCheckinTopicFirst[i].id);

        console.log("insertMemberCheckinTopDetailsFirst: ",
          this.insertMemberCheckinTopDetailsFirst);

        this.memberCheckinTopicApi.patchAttributes(this.MemberCheckinTopicFirst[i].id
            ,this.insertMemberCheckinTopDetailsFirst).subscribe( data1 => {
                console.log("Checkin Topic Data: ", data1);

                if(this.MemberCheckinTopicSecond == undefined){

                   var toast = this.matSnackBar.open("Checkin Saved Successfully...", "", {
                      duration: 2000,
                    });


                   toast.afterDismissed().subscribe(() => {
                    this.router.navigate(['/' + this.url_params + '/dashboards']); 
                  });
                }


            },
            (error) => {
              /*  this.snackBar.open('Some Error Occured!', '', {
                                      duration: 2000
                              }); 
                            })*/
                })
            }

      }

      //Second Topic Set
      if(this.MemberCheckinTopicSecond != undefined){

        for(var i=0; i < this.MemberCheckinTopicSecond.length; i++){

          this.insertMemberCheckinTopDetailsSecond = {
          above_beyond : this.checkInDetailsSaveSecond[i].aboveBeyond,
          misconduct : this.checkInDetailsSaveSecond[i].misConduct,
          comments: this.checkInDetailsSaveSecond[i].noteData,
          start_date : this.checkInDetailsSaveSecond[i].startdate1,
          end_date: this.checkInDetailsSaveSecond[i].enddate1,
          expected_date : this.checkInDetailsSaveSecond[i].expecteddate1,
          follow_up_date : this.checkInDetailsSaveSecond[i].followup1
        }

        console.log("this.MemberCheckinTopicFirst[i].id: ", 
        this.MemberCheckinTopicSecond[i].id);
        
        console.log("insertMemberCheckinTopDetailsSecond: ",
            this.insertMemberCheckinTopDetailsSecond);

        this.memberCheckinTopicApi.patchAttributes(this.MemberCheckinTopicSecond[i].id
            ,this.insertMemberCheckinTopDetailsSecond).subscribe( data1 => {
                console.log("Checkin Topic Data: ", data1);
                var toast = this.matSnackBar.open("Checkin Saved Successfully...", "", {
                  duration: 2000,
                });

                toast.afterDismissed().subscribe(() => {
                     this.router.navigate(['/' + this.url_params + '/dashboards']); 
                });
        

            },
            (error) => {
              this.matSnackBar.open('Some Error Occured!', '', {
                                      duration: 2000
                              }); 
                            }
                )
            }

      }


     
    },

    error => {

     this.matSnackBar.open("Some error occured", "", {
        duration: 2000,
      }); 
    }
  );


    this.checkinSaved = true;
  }

  checkinSubmit(){

    console.log("checkin submit");
    console.log("id_: ", this.savedCheckinDetails[0].id);

    if(this.checkinSaved == false){
    

      this.checkinApi.patchAttributes(this.savedCheckinDetails[0].id, {save_status : 1})
        .subscribe(
          data => {
            console.log("Checkin Data--------: ", data);



            this.employee['checkin_id'] = data.id;

            /* 
            this.matSnackBar.open("Updated Successfully...", "", {
              duration: 2000,
            });  */
          //First Topic Set
          if(this.MemberCheckinTopicFirst != undefined){

            for(var i=0; i < this.MemberCheckinTopicFirst.length; i++){
              this.insertMemberCheckinTopDetailsFirst = {
              above_beyond : this.checkInDetailsSave[i].aboveBeyond,
              misconduct : this.checkInDetailsSave[i].misConduct,
              comments: this.checkInDetailsSave[i].noteData,
              start_date : this.checkInDetailsSave[i].startdate1,
              end_date: this.checkInDetailsSave[i].enddate1,
              expected_date : this.checkInDetailsSave[i].expecteddate1,
              follow_up_date : this.checkInDetailsSave[i].followup1
            }

            /* console.log("this.MemberCheckinTopicFirst[i].id: ", 
              this.MemberCheckinTopicFirst[i].id);

            console.log("insertMemberCheckinTopDetailsFirst: ",
              this.insertMemberCheckinTopDetailsFirst); */

            this.memberCheckinTopicApi.patchAttributes(this.MemberCheckinTopicFirst[i].id
                ,this.insertMemberCheckinTopDetailsFirst).subscribe( data1 => {
                    //console.log("Checkin Topic Data: ", data1);
                    if(this.MemberCheckInType_.length == 1){
                      this.show_summary = true;
                    }
                    else{
                      this.show_summary = false;
                    }
                },
                (error) => {
                  /*  this.snackBar.open('Some Error Occured!', '', {
                                          duration: 2000
                                  }); 
                                })*/
                    })
                }

          }

          //Second Topic Set
          if(this.MemberCheckinTopicSecond != undefined){

            for(var i=0; i < this.MemberCheckinTopicSecond.length; i++){

              this.insertMemberCheckinTopDetailsSecond = {
              above_beyond : this.checkInDetailsSaveSecond[i].aboveBeyond,
              misconduct : this.checkInDetailsSaveSecond[i].misConduct,
              comments: this.checkInDetailsSaveSecond[i].noteData,
              start_date : this.checkInDetailsSaveSecond[i].startdate1,
              end_date: this.checkInDetailsSaveSecond[i].enddate1,
              expected_date : this.checkInDetailsSaveSecond[i].expecteddate1,
              follow_up_date : this.checkInDetailsSaveSecond[i].followup1
            }

            /* console.log("this.MemberCheckinTopicFirst[i].id: ", 
            this.MemberCheckinTopicSecond[i].id); */
            
           /*  console.log("insertMemberCheckinTopDetailsSecond: ",
                this.insertMemberCheckinTopDetailsSecond); */

            this.memberCheckinTopicApi.patchAttributes(this.MemberCheckinTopicSecond[i].id
                ,this.insertMemberCheckinTopDetailsSecond).subscribe( data1 => {



                    //console.log("Checkin Topic Data: ", data1);

                    if(this.MemberCheckInType_.length == 2){
                      this.show_summary = true;
                    }

                    this.matSnackBar.open("Checkin Submitted Successfully...", "", {
                      duration: 2000,
                    })

                  //   toast.afterDismissed().subscribe(() => {
                  //   this.router.navigate(['/' + this.url_params + '/dashboards']); 
                  // });
                },
                (error) => {
                  this.matSnackBar.open('Some Error Occured!', '', {
                                          duration: 2000
                                  }); 
                         })
                    
                }

          }
         
        },

        error => {

         this.matSnackBar.open("Some error occured", "", {
            duration: 2000,
          }); 
        }
      );
    
    }

    else{
      this.checkinApi.patchAttributes(this.savedCheckinDetails[0].id,  {save_status : 1}).
      subscribe((data) =>{
        this.show_summary = true;
    
        var toast = this.matSnackBar.open("Checkin Submitted Successfully...", "", {
          duration: 2000,
        });

         toast.afterDismissed().subscribe(() => {
          this.router.navigate(['/' + this.url_params + '/dashboards']); 
        });
      })
    }

   
  }


  backClicked(){
    this.nextbutton1 = false;
    this.back = true;

  }

}
