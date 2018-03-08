import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { RecapApi } from '../../../../../core/sdk/services/index';
import { MemberCheckinApi } from '../../../../../core/sdk/services/index';
import { RecapStrenthOpportunityApi } from '../../../../../core/sdk/services/index';
import { RecapTopicCompletionApi } from '../../../../../core/sdk/services/index';
import { MatAutocompleteTrigger, MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  @Input() employee: any;
  aboveBeyond = false;
  misconduct = false;
  expectedImprovement = false;
  temp_checkin_types :any=[];
  checkin_types :any=[];
  temp_checkin_topics_above :any=[];  
  checkin_topics_above :any=[];
  temp_checkin_topics_misconduct :any=[];
  checkin_topics_misconduct :any=[];
  temp_checkin_topics_expectation :any=[];
  checkin_topics_expectation :any=[];

  temp_checkin_topic_reg_period :any=[];
  checkin_topic_reg_period :any=[];
  temp_checkin_topic_corr_period :any=[];
  checkin_topic_corr_period :any=[];

  temp_checkin_topic_reg_lifetime :any=[];
  checkin_topic_reg_lifetime :any=[];
  temp_checkin_topic_corr_lifetime :any=[];
  checkin_topic_corr_lifetime :any=[];

  temp_checkin_topic_goal :any=[];
  checkin_topic_goal :any=[];
  temp_checkin_topic_task :any=[];
  checkin_topic_task :any=[];

  checkin_topic_goal_start :any=[];
  temp_checkin_topic_goal_start :any=[];
  checkin_topic_task_start :any=[];
  temp_checkin_topic_task_start :any=[];

  selectedCheckinTopic: any = [];
  checkinTopicSelection : {} ={};
  last_recap_date: any;
  login_user_id: any;

  model_period_topic_corr: any = [];

  checkinTopicSelectNumber = true;
  back=false;
  additional_res = false;

  most_tag_rec_recap_period: {} ={};
  most_tag_reg_recap_lifetime: {} ={};
  most_tag_corr_recap_period: {} ={};
  most_tag_corr_recap_lifetime: {} ={};


  topic_goal_end_date: {} ={};
  topic_goal_start_date: {} ={};
  topic_task_end_date: {} ={};
  topic_task_start_date: {} ={};

  goalAchieved: boolean;
  taskComplete: boolean;

  individual_standards: any;
  employee_performance: any;
  additional_responsibility: any;

  manager_notes: any;
  employee_notes: any;
  complete_growth_plan: any;
  
  insert_strenth_opp_array: any = [];
  insert_topic_comp_array: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public checkin: CheckinApi,
    public recap: RecapApi,
    public snackBar: MatSnackBar,
    public memberCheckin: MemberCheckinApi,
    public recapStrenthOpportunity: RecapStrenthOpportunityApi,
    public recapTopicCompletion: RecapTopicCompletionApi
  ) {}



/*  unique_count(array_elements){
  	 array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                return({
                	'type_name': current, 
                	'type_count': cnt 
                });
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
    	return({
        	'type_name': current, 
        	'type_count': cnt 
        });
    }
  }
*/
  ngOnInit() {
    //console.log("kkkkkkk",this.employee)

     this.login_user_id = localStorage.getItem('user_id');

    //find last recap date of this employee
    /*this.recap.find({
      where:{
        member_id: this.employee.employee_id
      },
      order: 'recap_date DESC',
      limit: 1
    }).subscribe((res) => {
   
      var Data = JSON.parse(JSON.stringify(res));
      this.last_recap_date = Data[0].recap_date;*/

          //displying reacp summary and emp period topic tags
          this.recap_summary(); 


          //emp life time topic tags
          this.recap_life_time_topics();


          //emp goals if selected
          this.recap_goals_task_end_date();


          //emp goals if selected
          this.recap_goals_task_start_date();

          this.goalAchieved = false;
          this.taskComplete = false;
          this.individual_standards = 0;
          this.additional_responsibility = 0;

     //});
    
    

  }

  set_least_date(dateTime){

    var date=new Date(dateTime);
    date.setHours(0,0,0,0);   
    return date;

  }

  set_most_date(dateTime){

    var date=new Date(dateTime);
    date.setHours(23,59,59,999);
    return date;

  }


  recap_summary(){
    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.employee_id,
            recap_complete: 0
          }
        }
      }, {
        relation:"MemberCheckinType",
        scope:{
          include: ["CheckInType",
          {
            relation:"MemberCheckinTopic",
            scope:{
              include:"Topic"
            }
          
         }]
        }
      }],
      where: {
        created_by: this.login_user_id,
        save_status: 1
        /*and: [{
          checkin_date: {
            gt: new Date(this.last_recap_date)
          }
        }, {
          checkin_date: {
            lt: new Date(this.employee.recap_date)
          }
        }]*/
      }
    }).subscribe((res) => {
      
      var Data = JSON.parse(JSON.stringify(res));
      var temp = []; 
      var count1 = 0; 
      var count2 = 0; 
      var length = Data.length;   
      Data.forEach((item) => {  
        count1++;
        if (item.MemberCheckin[0] != undefined) {         
           if (item.MemberCheckin[0].member_id != undefined) {
            if (item.MemberCheckinType != undefined) {            
              item.MemberCheckinType.forEach((value) => {               
                //if(temp.indexOf(value.CheckInType.id) === -1)

                  //list checkin types
                  this.temp_checkin_types.push({
                    type_name: value.CheckInType.checkin_name,
                    type_count: count2 + 1
                  });


               // this.temp_checkin_types.push(value.CheckInType.checkin_name);


                  //list above and beyond tags
                  if (value.MemberCheckinTopic != undefined) {  
                     value.MemberCheckinTopic.forEach((valueTopic) => { 
                          if(valueTopic.above_beyond == 1){
                            this.temp_checkin_topics_above.push({
                              topic_id: valueTopic.Topic.id,
                              topic_name: valueTopic.Topic.topic_name
                            });
                          }

                          if(valueTopic.misconduct == 1){
                            //if(valueTopic.Topic.id.indexOf(this.temp_checkin_topics_misconduct) != -1){

                             // var i = resArr.findIndex(x => x.name == item.name);
                             /* if(i <= -1){
                                    resArr.push({id: item.id, name: item.name});
                              }*/
                              this.temp_checkin_topics_misconduct.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });
                           //}
                          }

                          if(valueTopic.expectation != ""){
                            this.temp_checkin_topics_expectation.push({
                              topic_id: valueTopic.Topic.id,
                              topic_exp: valueTopic.expectation
                            });
                          }



                      });
                  }


                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Recognition & Appreciation"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_reg_period.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }

                  //all checkin topic under correction(major) in this period
                  if(value.CheckInType.checkin_name == "Correction (Major)"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_corr_period.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }


              });

            }
         }
        }
      });

      if(count1 == length){ 
        //var arrData = this.unique_count(this.temp_checkin_types);
        //this.checkin_types = arrData;

        this.checkin_types = this.temp_checkin_types;
        this.checkin_topics_above = this.temp_checkin_topics_above;
        this.checkin_topics_misconduct = this.temp_checkin_topics_misconduct;
        this.checkin_topics_expectation = this.temp_checkin_topics_expectation;
        this.checkin_topic_reg_period = this.temp_checkin_topic_reg_period;
        this.checkin_topic_corr_period = this.temp_checkin_topic_corr_period;
      }

    });
  }


  recap_life_time_topics(){

      this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.employee_id,
            recap_complete: 0
           
          }
        }
      }, {
        relation:"MemberCheckinType",
        scope:{
          include: ["CheckInType",
          {
            relation:"MemberCheckinTopic",
            scope:{
              include:"Topic"
            }
          
         }]
        }
      }],
      where: {       
        save_status: 1       
      }
    }).subscribe((res) => {


      

      var Data = JSON.parse(JSON.stringify(res));
      var temp = []; 
      var count1 = 0; 
      var count2 = 0; 
      var length = Data.length;   
      Data.forEach((item) => {  
        count1++;
        if (item.MemberCheckin[0] != undefined) {         
           if (item.MemberCheckin[0].member_id != undefined) {
            if (item.MemberCheckinType != undefined) {            
              item.MemberCheckinType.forEach((value) => {  


                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Recognition & Appreciation"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_reg_lifetime.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }

                  //all checkin topic under correction(major) in this period
                  if(value.CheckInType.checkin_name == "Correction (Major)"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_corr_lifetime.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }


              });

            }
         }
        }
      });

      if(count1 == length){ 

        this.checkin_topic_reg_lifetime = this.temp_checkin_topic_reg_lifetime;
        this.checkin_topic_corr_lifetime = this.temp_checkin_topic_corr_lifetime;
      }

    });
  }


  recap_goals_task_end_date(){

    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.employee_id,
            recap_complete: 0
          }
        }
      }, {
        relation:"MemberCheckinType",
        scope:{
          include: ["CheckInType",
          {
            relation:"MemberCheckinTopic",
            scope:{
              include:"Topic",
              order:'end_date DESC'
            }
          
         }]
        }
      }],
      where: {
        created_by: this.login_user_id,
        save_status: 1
        /*and: [{
          checkin_date: {
            gt: new Date(this.set_least_date(this.last_recap_date))
          }
        }, {
          checkin_date: {
            lt: new Date(this.set_most_date(this.employee.recap_date))
          }
        }]*/
      }
    }).subscribe((res) => {
      
      var Data = JSON.parse(JSON.stringify(res));

      var temp = []; 
      var count1 = 0; 
      var count2 = 0; 
      var length = Data.length;   
      Data.forEach((item) => {  
        count1++;
        if (item.MemberCheckin[0] != undefined) {         
           if (item.MemberCheckin[0].member_id != undefined) {
            if (item.MemberCheckinType != undefined) {            
              item.MemberCheckinType.forEach((value) => {               
                //if(temp.indexOf(value.CheckInType.id) === -1)

                  //list checkin types
                  this.temp_checkin_types.push({
                    type_name: value.CheckInType.checkin_name,
                    type_count: count2 + 1
                  });


               // this.temp_checkin_types.push(value.CheckInType.checkin_name);


                  //list above and beyond tags
                  if (value.MemberCheckinTopic != undefined) {  
                     value.MemberCheckinTopic.forEach((valueTopic) => { 
                          if(valueTopic.above_beyond == 1){
                            this.temp_checkin_topics_above.push({
                              topic_id: valueTopic.Topic.id,
                              topic_name: valueTopic.Topic.topic_name
                            });
                          }

                          if(valueTopic.misconduct == 1){
                            this.temp_checkin_topics_misconduct.push({
                              topic_id: valueTopic.Topic.id,
                              topic_name: valueTopic.Topic.topic_name
                            });
                          }

                          if(valueTopic.expectation != ""){
                            this.temp_checkin_topics_expectation.push({
                              topic_id: valueTopic.Topic.id,
                              topic_exp: valueTopic.expectation
                            });
                          }



                      });
                  }


                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Goals"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_goal.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }

                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Tasks"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {  
                            //if(valueTopic.Topic.id.indexOf(this.temp_checkin_topic_task) != -1){                           
                               this.temp_checkin_topic_task.push({
                                  topic_id: valueTopic.Topic.id,
                                  topic_name: valueTopic.Topic.topic_name
                                });
                              //}
                           });
                         } 
                  }

              });

            }
         }
        }
      });

      if(count1 == length){         

         if(this.employee.goals == true){       
            this.checkin_topic_goal = this.temp_checkin_topic_goal;
          }
          if(this.employee.tasks == true){ 
            this.checkin_topic_task = this.temp_checkin_topic_task;
          }
      }

    });

  }

   recap_goals_task_start_date(){

    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.employee_id,
            recap_complete: 0
          }
        }
      }, {
        relation:"MemberCheckinType",
        scope:{
          include: ["CheckInType",
          {
            relation:"MemberCheckinTopic",
            scope:{
              include:"Topic",
              order:'start_date ASC'
            }
          
         }]
        }
      }],
      where: {
        created_by: this.login_user_id,
        save_status: 1
        /*and: [{
          checkin_date: {
            gt: new Date(this.set_least_date(this.last_recap_date))
          }
        }, {
          checkin_date: {
            lt: new Date(this.set_most_date(this.employee.recap_date))
          }
        }]*/
      }
    }).subscribe((res) => {
      
      var Data = JSON.parse(JSON.stringify(res));

      var temp = []; 
      var count1 = 0; 
      var count2 = 0; 
      var length = Data.length;   
      Data.forEach((item) => {  
        count1++;
        if (item.MemberCheckin[0] != undefined) {         
           if (item.MemberCheckin[0].member_id != undefined) {
            if (item.MemberCheckinType != undefined) {            
              item.MemberCheckinType.forEach((value) => {               
                //if(temp.indexOf(value.CheckInType.id) === -1)

                  //list checkin types
                  this.temp_checkin_types.push({
                    type_name: value.CheckInType.checkin_name,
                    type_count: count2 + 1
                  });


               // this.temp_checkin_types.push(value.CheckInType.checkin_name);


                  //list above and beyond tags
                  if (value.MemberCheckinTopic != undefined) {  
                     value.MemberCheckinTopic.forEach((valueTopic) => { 
                          if(valueTopic.above_beyond == 1){
                            this.temp_checkin_topics_above.push({
                              topic_id: valueTopic.Topic.id,
                              topic_name: valueTopic.Topic.topic_name
                            });
                          }

                          if(valueTopic.misconduct == 1){
                            this.temp_checkin_topics_misconduct.push({
                              topic_id: valueTopic.Topic.id,
                              topic_name: valueTopic.Topic.topic_name
                            });
                          }

                          if(valueTopic.expectation != ""){
                            this.temp_checkin_topics_expectation.push({
                              topic_id: valueTopic.Topic.id,
                              topic_exp: valueTopic.expectation
                            });
                          }



                      });
                  }


                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Goals"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_goal_start.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }

                  //all checkin topic under Recognition type in this period
                  if(value.CheckInType.checkin_name == "Tasks"){
                       if (value.MemberCheckinTopic != undefined) {  
                          value.MemberCheckinTopic.forEach((valueTopic) => {                             
                             this.temp_checkin_topic_task_start.push({
                                topic_id: valueTopic.Topic.id,
                                topic_name: valueTopic.Topic.topic_name
                              });

                           });
                         } 
                  }

              });

            }
         }
        }
      });

      if(count1 == length){         

         if(this.employee.goals == true){       
            this.checkin_topic_goal_start = this.temp_checkin_topic_goal_start;
          }
          if(this.employee.tasks == true){ 
            this.checkin_topic_task_start = this.temp_checkin_topic_task_start;
          }
      }

    });

  }

  /*additional_responsibility(type){
    if(type == 'Y'){
      this.additional_res = true;
    } else {
      this.additional_res = false;
    }
  }*/


   getCheckinTypeName(topic) {

    if (this.checkinTopicSelection[topic.topic_id] == true) {
      this.selectedCheckinTopic.push({ name: topic.topic_name, id: topic.topic_id});  
      if(this.selectedCheckinTopic.length > 2){      
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });   
        this.checkinTopicSelectNumber = true;     
      } else{
        this.checkinTopicSelectNumber = false;
      }
    }
    else{
  
      this.selectedCheckinTopic.map((item:any,index:any)=>{
        if (topic.topic_id == item.topic_id) {
          this.selectedCheckinTopic.splice(index, 1);
        }
      })

      if(this.selectedCheckinTopic.length > 2){
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.checkinTopicSelectNumber = true;
      } else{
        this.checkinTopicSelectNumber = false;
      }
    };
    //setting select checkin
    //this.checkin_name = type.checkin_name;
    
  }

  recapSubmit(){

      //console.log("bbbbb",this.individual_standards)
      // console.log("aaa",this.employee_performance)
      // console.log("additional_responsibility",this.additional_responsibility)
      // console.log("manager_notes",this.manager_notes)
      // console.log("employee_notes",this.employee_notes)
      // console.log("employee_notes",this.complete_growth_plan)
    

    //console.log("kkkkkkk",this.employee);

    this.recap.create({
        checkin_id:this.employee.checkin_id,
        member_id:this.employee.employee_id,
        created_by:localStorage.getItem('user_id'),
        is_goal:this.employee.goals,
        is_task:this.employee.tasks,
        is_assessment:this.employee.assessment,
        goal_achieved:this.goalAchieved,
        recap_date:new Date(),
        individual_standards:this.individual_standards,
        member_performance:this.employee_performance,
        additional_responsibility:this.additional_responsibility,
        complete_growth_plan:this.complete_growth_plan,
        creator_note:this.manager_notes,
        member_note:this.employee_notes,
        save_status:1,
        ack_send:0,
        ack_receive:0,
        pulse_survey:0
    }). subscribe((data) => {
        //console.log("success: ", data)
        
      

              var arr_1=Object.keys(this.most_tag_rec_recap_period);
              //var arr_most_tag_rec_recap_period = [];
               arr_1.forEach((id) => {  
                if(this.most_tag_rec_recap_period[id] == true){
                  // arr_most_tag_rec_recap_period.push(id)
                  this.insert_strenth_opp_array.push({
                    recap_id:data['id'],
                    topic_id:id,
                    type:"S",
                    period:"R"
                  })
                }
               })

              var arr_2=Object.keys(this.most_tag_reg_recap_lifetime);
              //var arr_most_tag_reg_recap_lifetime = [];
               arr_2.forEach((id) => {  
                if(this.most_tag_reg_recap_lifetime[id] == true){
                  //arr_most_tag_reg_recap_lifetime.push(id)
                  this.insert_strenth_opp_array.push({
                    recap_id:data['id'],
                    topic_id:id,
                    type:"S",
                    period:"L"
                  })
                }
               })

          
              var arr_3=Object.keys(this.most_tag_corr_recap_period);
              //var arr_most_tag_corr_recap_period = [];
               arr_3.forEach((id) => {  
                if(this.most_tag_corr_recap_period[id] == true){
                  //arr_most_tag_corr_recap_period.push(id)          
                  this.insert_strenth_opp_array.push({
                    recap_id:data['id'],
                    topic_id:id,
                    type:"O",
                    period:"R"
                  })
                }
               })


              var arr_4=Object.keys(this.most_tag_corr_recap_lifetime);
              //var arr_most_tag_corr_recap_lifetime = [];
               arr_4.forEach((id) => {  
                if(this.most_tag_corr_recap_lifetime[id] == true){
                  //arr_most_tag_corr_recap_lifetime.push(id)
                   this.insert_strenth_opp_array.push({
                    recap_id:data['id'],
                    topic_id:id,
                    type:"O",
                    period:"L"
                  })
                }
               })


          //------------goal achieved and task completion

             //goals end date
            var arr_5=Object.keys(this.topic_goal_end_date);
            //var arr_topic_goal_end_date = [];
             arr_5.forEach((id) => {  
              if(this.topic_goal_end_date[id] == true){
                //arr_topic_goal_end_date.push(id)
                this.insert_topic_comp_array.push({
                  recap_id:data['id'],
                  topic_id:id,
                  type:"G",
                  task_complete:0
                })
              }
             })

             //console.log("test",this.goalAchieved)

              //goals end date
            var arr_6=Object.keys(this.topic_goal_start_date);
            //var arr_topic_goal_start_date = [];
            arr_6.forEach((id) => {  
              if(this.topic_goal_start_date[id] == true){
                //arr_topic_goal_start_date.push(id)
                this.insert_topic_comp_array.push({
                  recap_id:data['id'],
                  topic_id:id,
                  type:"G",
                  task_complete:0
                })
              }
             })

            //tasks end date
            var arr_7=Object.keys(this.topic_task_end_date);
            //var arr_topic_task_end_date = [];
            arr_7.forEach((id) => {  
              if(this.topic_task_end_date[id] == true){
                //arr_topic_task_end_date.push(id)
                this.insert_topic_comp_array.push({
                  recap_id:data['id'],
                  topic_id:id,
                  type:"T",
                  task_complete:this.taskComplete
                })
              }
             })

            //console.log("test",this.taskComplete)

             //tasks start date
            var arr_8=Object.keys(this.topic_task_start_date);
            //var arr_topic_task_start_date = [];
            arr_8.forEach((id) => {  
              if(this.topic_task_start_date[id] == true){
                //arr_topic_task_start_date.push(id)
                 this.insert_topic_comp_array.push({
                  recap_id:data['id'],
                  topic_id:id,
                  type:"T",
                  task_complete:this.taskComplete
                })
              }
             })



           //insert to strength and oppurtunity table   
          this.recapStrenthOpportunity.create(this.insert_strenth_opp_array       
            ). subscribe((dataOpp) => {


                //insert to topic completion table
                this.recapTopicCompletion.create(this.insert_topic_comp_array       
                ). subscribe((dataComp) => {

                    this.snackBar.open('Recap Saved Successfully', '', {
                      duration: 2000
                    });

                },
                  (errorComp) => {
                    this.snackBar.open('Some Error Occured!', '', {
                        duration: 2000
                    });
                  })


          },
            (errorOpp) => {
              this.snackBar.open('Some Error Occured!', '', {
                  duration: 2000
              });
            })


  },
    (errorData) => {
      this.snackBar.open('Some Error Occured!', '', {
          duration: 2000
      });
    })



     

  }


  backClicked(){
    sessionStorage.setItem('recapDetails', JSON.stringify(this.employee));
    this.back = true;
  }
  nextButton(){
    //this.recap_confirmation = true;
  }
}
