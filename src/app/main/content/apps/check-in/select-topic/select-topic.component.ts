import { Component, OnInit, Input, Pipe, ViewEncapsulation } from '@angular/core';
import { TopicApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-select-topic',
  templateUrl: './select-topic.component.html',
  styleUrls: ['./select-topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectTopicComponent implements OnInit {
  @Input() employee: any;
  @Input() selected_type: any;
  @Input() topic_datas: any;
  @Input() informSelectedEmployee: any;
  @Input() back_enable: any;
  @Input() topic_back: any;
  @Input() topicdetails: any;
  @Input() insertCheckinDetails: any;
  @Input() selectedCheckinType : any;
  @Input() selectedCheckinTypesBack : any;
  @Input() selectedFirstTopicDetailsBack : any
  @Input() selectedSecondTopicDetailsBack: any
  topic_data: any[];
  first_topic_category: any = {};
  second_topic_category: any = {};
  topicdata: any = {};
  _topicdata: any = {};
  check_sub = [];
  subtopic_data = [];
  checked = false;
  show = false;
  flag = true;
  back = false;
  load : any = false;
  manager_id: any;
  checkInData: any = {};
  resDate: any;
  resDateString: any = [];
  checkIn: boolean = false;
  userType: any;
  currentSession: any;
  checkInNotExist: boolean = false;
  employeeLength: any;
  firsttopicsSelectNumber = true;
  secondtopicsSelectNumber = true;
  selectedFirstTopicDetails: any = [];
  selectedSecondTopicDetails: any = [];
  selectedTopicId: any = [];
  showSecondPanel : any = false;
  submitButtonFlag: any = true;

  constructor(
    private topic: TopicApi,
    private checkin: CheckinApi,
    public snackBar: MatSnackBar

  ) {}

  step = 0;

  setStep(index: number){
    console.log("index: ", index)
    this.step = index;
  }

  nextStep(checkinType){
    this.step++;
    console.log("step: ", this.step);
    // first topic 
    console.log("checkin_type: ", checkinType);
  }

  prevStep(){
    this.step--;
  }

  ngOnInit() {
    
    /* if(this.back_enable!=undefined){
      this.topicsSelectNumber = this.back_enable;
    }
    // console.log("22222222222222",this.employee)
    this.userType = localStorage.getItem("userType");

    if (this.topic_back != undefined) {
      this.topic_back.map((_item: any) => {
        //this.topic_category[_item.id] = true;
      });
      this.selectedTopicDetails = this.topic_back;
    } */

    this.topic.find({
      where:{
        is_hide:0
      }
    }).subscribe((res) => {
      this.topic_data = res;
      this.load = true;
    });

    this.manager_id = localStorage.getItem('userId')
    this.employeeLength = this.employee.selectedEmployeeLength;

    if(this.insertCheckinDetails != undefined){
      this.insertCheckinDetails = this.insertCheckinDetails;
    }
    
    if(this.informSelectedEmployee != undefined){
      this.informSelectedEmployee = this.informSelectedEmployee;
    }

    if(this.selectedCheckinType != undefined){
      this.selectedCheckinType = this.selectedCheckinType;
      console.log("selectedCheckinType in nextpage: ", this.selectedCheckinType);
      if(this.selectedCheckinType.length == 2){
        this.showSecondPanel = true;
      }
      else{
        this.showSecondPanel = false;
      }
       
    }

    if(this.selectedCheckinTypesBack != undefined){

      this.selectedCheckinType = this.selectedCheckinTypesBack;
      console.log("selectedCheckinType in back: ", this.selectedCheckinType);
      console.log("this.selectedCheckinType_length: ",  this.selectedCheckinType.length);
      if(this.selectedCheckinType.length == 2){
        this.showSecondPanel = true;
      }
    }

    if(this.selectedFirstTopicDetailsBack != undefined){
      console.log("selectedFirstTopicDetailsBack: ", this.selectedFirstTopicDetailsBack);
      this.selectedFirstTopicDetails = this.selectedFirstTopicDetailsBack
    }

    if(this.selectedSecondTopicDetailsBack != undefined){
      console.log("selectedSecondTopicDetailsBack:  ", this.selectedSecondTopicDetailsBack);
      this.selectedSecondTopicDetails = this.selectedSecondTopicDetailsBack;
    }



    if(this.selectedFirstTopicDetailsBack !=  undefined){
      this.selectedFirstTopicDetailsBack.map((_item: any) => {
        this.first_topic_category[_item.id] = true;
      });
    }
    if(this.selectedSecondTopicDetailsBack !=undefined){
      this.selectedSecondTopicDetailsBack.map((_item: any) => {
        this.second_topic_category[_item.id] = true;
      });
    }
   

    if(this.selectedFirstTopicDetails.length >= 1){
       this.firsttopicsSelectNumber = false;
    }
    if (this.selectedSecondTopicDetails.length >= 1){
      this.secondtopicsSelectNumber = false;
    }


   /*  if( this.firsttopicsSelectNumber == false && this.secondtopicsSelectNumber == false){
      this.submitButtonFlag = false;
    } */
    
    //button setting
    if(this.selectedCheckinType.length == 2 ){
      if(this.secondtopicsSelectNumber == false){
        this.submitButtonFlag = false;
      }

      else{
        this.submitButtonFlag = true;
      }

    }
    else if(this.selectedCheckinType.length == 1){
      if(this.firsttopicsSelectNumber == false){
        this.submitButtonFlag = false;
      }
      else{
        this.submitButtonFlag = true;
      }

    } 
  }


  backClicked() {
    this.back = true;
  }

  selectFirstTopic(obj) {

    //var selected = this.selected_type.type;
    console.log("select: ", this.first_topic_category[obj.id]); 
    if (this.first_topic_category[obj.id] == true) {  

      this.selectedFirstTopicDetails.push({ name: obj.topic_name, id: obj.id });
      console.log("selectedTopicDetails: ", this.selectedFirstTopicDetails)
  
      /* if(this.selectedTopicDetails.length > 2){
        console.log("111")
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.topicsSelectNumber = true;
      } */
      if(this.selectedFirstTopicDetails.length < 1){
           console.log("222")
        this.snackBar.open('Select minimum 1', '', {
          duration: 2000
        });
        this.firsttopicsSelectNumber = true;
      }
      else{
           console.log("333")
        this.firsttopicsSelectNumber = false;
      }
    }
    else{
     
      console.log("this.topicsSelectNumber:", this.firsttopicsSelectNumber); 
  
      this.selectedFirstTopicDetails.map((item:any,index:any)=>{
        if (obj.id==item.id) {
          this.selectedFirstTopicDetails.splice(index, 1);
        }
            })
      
      //console.log("selectedTopicDetails: ", this.selectedTopicDetails); 
      //console.log("lengt: ", this.selectedTopicDetails.length); 
      //console.log("this.topicsSelectNumber:", this.topicsSelectNumber);

      /* if(this.selectedTopicDetails.length > 2){
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.topicsSelectNumber = true;
      } */
      if(this.selectedFirstTopicDetails.length < 1){
        this.snackBar.open('Select minimum 1', '', {
          duration: 2000
        });
        this.firsttopicsSelectNumber = true;
      }

      else{
        this.firsttopicsSelectNumber = false;
      }
    }

    console.log("this.secondtopicsSelectNumber: " , this.secondtopicsSelectNumber);
    console.log("this.firsttopicsSelectNumber: " , this.firsttopicsSelectNumber);
    console.log("this.selectedCheckinType.length:", this.selectedCheckinType.length ); 
    //button setting
    if(this.selectedCheckinType.length == 2 ){
      if(this.secondtopicsSelectNumber == false){
        this.submitButtonFlag = false;
      }

      else{
        this.submitButtonFlag = true;
      }

    }
    else if(this.selectedCheckinType.length == 1){
      if(this.firsttopicsSelectNumber == false){
        this.submitButtonFlag = false;
      }
      else{
        this.submitButtonFlag = true;
      }

    } 
  }


  selectSecondTopic(obj) {
    
        //var selected = this.selected_type.type;
        console.log("select: ", this.second_topic_category[obj.id]); 
        if (this.second_topic_category[obj.id] == true) {  
    
          this.selectedSecondTopicDetails.push({ name: obj.topic_name, id: obj.id });
          console.log("selectedSecondTopicDetails: ", this.selectedSecondTopicDetails)
      
          if(this.selectedSecondTopicDetails.length < 1){
               console.log("222")
            this.snackBar.open('Select minimum 1', '', {
              duration: 2000
            });
            this.secondtopicsSelectNumber = true;
          }
          else{
               console.log("333")
            this.secondtopicsSelectNumber = false;
          }
        }
        else{
         
          console.log("this.topicsSelectNumber:", this.secondtopicsSelectNumber); 
      
          this.selectedSecondTopicDetails.map((item:any,index:any)=>{
            if (obj.id==item.id) {
              this.selectedSecondTopicDetails.splice(index, 1);
            }
                })
          
          //console.log("selectedTopicDetails: ", this.selectedTopicDetails); 
          //console.log("lengt: ", this.selectedTopicDetails.length); 
          //console.log("this.topicsSelectNumber:", this.topicsSelectNumber);
    
          /* if(this.selectedTopicDetails.length > 2){
            this.snackBar.open('You can select up to 2 max', '', {
              duration: 2000
            });
            this.topicsSelectNumber = true;
          } */
          if(this.selectedSecondTopicDetails.length < 1){
            this.snackBar.open('Select minimum 1', '', {
              duration: 2000
            });
            this.secondtopicsSelectNumber = true;
          }
    
          else{
            this.secondtopicsSelectNumber = false;
          }
        }

        console.log("this.secondtopicsSelectNumber: " , this.secondtopicsSelectNumber);
        console.log("this.firsttopicsSelectNumber: " , this.firsttopicsSelectNumber);
        console.log("this.selectedCheckinType.length:", this.selectedCheckinType.length ); 
        //button setting
        if(this.selectedCheckinType.length == 2 ){
          if(this.secondtopicsSelectNumber == false){
            this.submitButtonFlag = false;
          }
          else{
            this.submitButtonFlag = true;
          }
    
        }
        else if(this.selectedCheckinType.length == 1){
          if(this.firsttopicsSelectNumber == false){
            this.submitButtonFlag = false;
          }
          else{
            this.submitButtonFlag = true;
          }
    

        } 
      }
  
  createCheckin() {
    this.show = true;
  }
}
