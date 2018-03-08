import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MemberApi } from '../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../core/sdk/services/index';
import { RecapApi } from '../../../../core/sdk/services/index';
import { MatAutocompleteTrigger, MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';
import { RecapStrenthOpportunityApi } from '../../../../core/sdk/services/index';
import { RecapTopicCompletionApi } from '../../../../core/sdk/services/index';
import { MemberCheckinApi, CheckInTypeApi } from '../../../../core/sdk/services/index';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recapNew',
  templateUrl: './recap-new.component.html',
  styleUrls: ['./recap-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecapComponentNew implements OnInit {
  step1_next: any;
  step1_saved: any;
  employee: any;
  current_stage: number;
  goals = false;
  tasks = false;
  assessment = false;
  employees: any[];
  employees1: any[];
  employee_id: any = {};
  employe_data: any = {};
  empSelection: FormGroup;
  temp = [];
  employee_user_id = 0;
  next = false;
  separatorKeysCodes = [ENTER];
  resetValue;
  arrayOfKeys: any;
  selectedEmployeeLength: any;
  empTextFiled: string;
  insertCheckinDetails: any;
  start_date: any;
  end_date: any;
  recap_date: any;
  checkin_id: 0;
  date = new FormControl(new Date());
  url_params : any;

  recap_details: any;
  strength_recap: any;
  strength_lifetime: any;
  oppurtunity_recap: any;
  oppurtunity_lifetime: any;
  completed_goal: any;
  incompleted_goal: any;
  completed_task: any;
  incompleted_task: any;

  // detail view
  aboveBeyond = false;
  misconduct = false;
  expectedImprovement = false;
  temp_checkin_types: any = [];
  checkin_types: any = [];

  number_goals: any;
  number_tasks: any;
  number_reg: any;
  number_news: any;
  number_corr_major: any;
  number_corr_minor: any;


  temp_checkin_topics_above: any = [];
  checkin_topics_above: any = [];
  temp_checkin_topics_misconduct: any = [];
  checkin_topics_misconduct: any = [];
  temp_checkin_topics_expectation: any = [];
  checkin_topics_expectation: any = [];

  temp_checkin_topic_reg_period: any = [];
  checkin_topic_reg_period: any = [];
  temp_checkin_topic_corr_period: any = [];
  checkin_topic_corr_period: any = [];

  temp_checkin_topic_reg_lifetime: any = [];
  checkin_topic_reg_lifetime: any = [];
  temp_checkin_topic_corr_lifetime: any = [];
  checkin_topic_corr_lifetime: any = [];

  temp_checkin_topic_goal: any = [];
  checkin_topic_goal: any = [];
  temp_checkin_topic_task: any = [];
  checkin_topic_task: any = [];

  checkin_topic_goal_start: any = [];
  temp_checkin_topic_goal_start: any = [];
  checkin_topic_task_start: any = [];
  temp_checkin_topic_task_start: any = [];

  selectedCheckinTopic: any = [];
  checkinTopicSelection: {} = {};
  last_recap_date: any;
  login_user_id: any;

  model_period_topic_corr: any = [];

  checkinTopicSelectNumber = true;
  back = false;
  additional_res = false;

  most_tag_rec_recap_period: {} = {};
  most_tag_reg_recap_lifetime: {} = {};
  most_tag_corr_recap_period: {} = {};
  most_tag_corr_recap_lifetime: {} = {};


  topic_goal_end_date: {} = {};
  topic_goal_start_date: {} = {};
  topic_task_end_date: {} = {};
  topic_task_start_date: {} = {};

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
  arr_goal_complted: any[];
  arr_goal_notcomplted: any[];
  recap_id: string = '';
  checkin_type: any;
  checkin_temp: any;
  checkin_type_list: any;
  need_emp_ack:any;

  topic_list: any;
  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    public checkin: CheckinApi,
    public snackBar: MatSnackBar,
    public recap: RecapApi,
    public recapStrenthOpportunity: RecapStrenthOpportunityApi,
    public recapTopicCompletion: RecapTopicCompletionApi,
    public memberCheckinApi: MemberCheckinApi,
    public checkinTypeApi: CheckInTypeApi,
    private router: Router
  ) { }
  ngOnInit() {
    this.init();
  }
  init() {
    this.need_emp_ack=true;
    this.step1_next = true;
    this.step1_saved = true;
    this.current_stage = 1;
    this.empTextFiled = "";
    this.employee = {};
    this.number_goals = 0;
    this.number_tasks = 0;
    this.number_reg = 0;
    this.number_news = 0;
    this.number_corr_major = 0;
    this.number_corr_minor = 0;
    this.goalAchieved = false;
    this.taskComplete = false;
    this.individual_standards = 0;
    this.additional_responsibility = 0;
    var userId = localStorage.getItem('user_id');
    this.login_user_id = localStorage.getItem('user_id');
    this.recap_date = this.date;
    this.checkin_type = {};
    this.topic_list = {
      "misconduct": [],
      "above": [],
      "expected": [],
      "goals": [],
      "tasks": [],
      "oppurtunities_recap_major": [],
      "oppurtunities_recap_minor": [],
      "oppurtunities_lifetime": [],
      "strength_recap": [],
      "strength_lifetime": []
    }
    this.checkinTypeApi.find().subscribe((res) => {
      this.checkin_type_list = res;
      res.map((item) => {
        this.checkin_temp = item;
        this.checkin_type[this.checkin_temp.id] = { "details": item, "count": 0, "topics": [] };
      })
    });

    //employees listing who is still not recaped
    this.checkin.find({
      include: {
        relation: "MemberCheckin",
        scope: {
          include: "Member"
        }
      },
      where: {
        // created_by: userId,
        save_status: 1
      }
    }).subscribe((res) => {
      var Data = JSON.parse(JSON.stringify(res));
      var nameArr = [];
      Data.forEach((item) => {
        if (item.MemberCheckin != undefined) {
          item.MemberCheckin.forEach((value) => {
            if (value.Member != undefined) {
              // value.Member['checkin_id'] = value.checkin_id
              nameArr = nameArr.filter((mem) => {
                return mem.id != value.Member.id
              })
              nameArr.push(value.Member);
              // this.temp.push(value.Member);
            }
          })
        }
      });
      this.employees = nameArr;
      this.temp = nameArr;
    });

  }



  nextButton() {
    this.current_stage++;
  }

  backButton() {
    this.current_stage--;
  }

  updateFilter(event) {
    this.empTextFiled = "";
    //console.log("event:", event);
    if (event.target.value != "") {
      const val = event.target.value.toLowerCase();
      const temp = this.temp.filter((d: any) => {
        return (d.first_name.toLowerCase().indexOf(val) !== -1 || !val);
      });
      this.employees1 = temp;

    } else {
      this.employees1 = [];
    }
  }

  getEmployeeId(id, obj) {
    this.step1_next = true;
    this.step1_saved = true;
    this.empTextFiled = "";
    this.employee_user_id = id;
    // this.checkin_id = checkin_id;
    this.employee = obj;

    this.recap.find({
      where: {
        member_id: this.employee.id,
        // checkin_id: checkin_id,
        save_status: 0
      },
      limit: 1
    }).subscribe((res) => {

      var Data = JSON.parse(JSON.stringify(res));
      if (Data.length > 0) {
        this.step1_saved = false;
        // this.date = Data[0].recap_date;
      }
      else {
        this.step1_next = false;
      }



      //displying reacp summary and emp period topic tags
      this.recap_summary();


      //emp life time topic tags
      this.recap_life_time_topics();


      //emp goals if selected
      this.recap_goals_task_end_date();


      //emp goals if selected
      this.recap_goals_task_start_date();


    });
  }

  updateRecap() {
    this.recap.find({
      where: {
        member_id: this.employee.id,
        save_status: 0
      },
      include: [{
        "relation": "TopicCompletion", scope: {
          include: [{ "relation": "Topic" }]
        }
      }, {
        "relation": "StrenthOppurtunity", scope: {
          include: [{ "relation": "Topic" }]
        }
      }],
      limit: 1
    }).subscribe((res) => {
      var Data = JSON.parse(JSON.stringify(res));
      if (Data.length > 0) {
        // this.date = Data[0].recap_date;
        this.recap_id = Data[0].id;
        // this.checkin_id = Data[0].checkin_id,
        this.goals = Data[0].is_goal,
          this.tasks = Data[0].is_task,
          this.assessment = Data[0].is_assessment,
          this.goalAchieved = Data[0].goal_achieved,
          this.recap_date = Data[0].recap_date,
          this.individual_standards = Data[0].individual_standards,
          this.employee_performance = Data[0].member_performance,
          this.additional_responsibility = Data[0].additional_responsibility,
          this.complete_growth_plan = Data[0].complete_growth_plan,
          this.manager_notes = Data[0].creator_note,
          this.employee_notes = Data[0].member_note

        var recap_data = Data[0];
        recap_data.StrenthOppurtunity.map((d) => {

          if (d.type == 'S') {
            if (d.period == 'R') {
              this.most_tag_rec_recap_period[d.topic_id] = true;

            } else {

              this.most_tag_reg_recap_lifetime[d.topic_id] = true;
            }
          }
          else if (d.type == 'O') {
            if (d.period == 'R') {
              this.most_tag_corr_recap_period[d.topic_id] = true;

            }
            else {

              this.most_tag_corr_recap_lifetime[d.topic_id] = true;

            }
          }
        });

        recap_data.TopicCompletion.map((d) => {
          if (d.type == 'G') {
            this.topic_goal_end_date[d.topic_id] = true;
          }
          else if (d.type == 'T') {
            this.topic_task_end_date[d.topic_id] = true;
          }
          else {

          }
        })
        this.current_stage++;
      }
      else {
        this.snackBar.open('No draft recap found', '', {
          duration: 2000
        });
      }
    });
  }

  set_least_date(dateTime) {

    var date = new Date(dateTime);
    date.setHours(0, 0, 0, 0);
    return date;

  }

  set_most_date(dateTime) {

    var date = new Date(dateTime);
    date.setHours(23, 59, 59, 999);
    return date;

  }

  //To find recap time period
  recap_summary() {
    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.id,
          }
        }
      }, {
        relation: "MemberCheckinType",
        scope: {
          include: ["CheckInType",
            {
              relation: "MemberCheckinTopic",
              scope: {
                include: "Topic"
              }

            }]
        }
      }],
      where: {
        // created_by: this.login_user_id,
        // save_status: 1
        // id: this.checkin_id
      }
    }).subscribe((res) => {

      var Data = JSON.parse(JSON.stringify(res));
      Data.forEach((item) => {
        if (item.MemberCheckin.length > 0) {
          if (item.MemberCheckinType) {
            item.MemberCheckinType.forEach((value) => {
              this.checkin_type[value.CheckInType.id].count = this.checkin_type[value.CheckInType.id].count + 1;
              this.checkin_type[value.CheckInType.id].topics = [...this.checkin_type[value.CheckInType.id].topics, ...value.MemberCheckinTopic]
              if (value.CheckInType.checkin_name == "Recognition & Appreciation") {
                this.topic_list.strength_recap = [...this.topic_list.strength_recap, ...value.MemberCheckinTopic];
              }
              if (value.CheckInType.checkin_name == "Correction (Major)") {
                this.topic_list.oppurtunities_recap_major = [...this.topic_list.oppurtunities_recap_major, ...value.MemberCheckinTopic];
              }
              if (value.CheckInType.checkin_name == "Correction (Minor)") {

                this.topic_list.oppurtunities_recap_minor = [...this.topic_list.oppurtunities_recap_minor, ...value.MemberCheckinTopic];
              }
              if (value.CheckInType.checkin_name == "Goals") {
                this.topic_list.goals = [...this.topic_list.goals, ...value.MemberCheckinTopic];
              }

              if (value.CheckInType.checkin_name == "Tasks") {
                this.topic_list.tasks = [...this.topic_list.tasks, ...value.MemberCheckinTopic];
              }
              value.MemberCheckinTopic.forEach((valueTopic) => {
                if (valueTopic.above_beyond == 1) {
                  this.topic_list.above.push(valueTopic)
                }
                if (valueTopic.misconduct == 1) {
                  this.topic_list.misconduct.push(valueTopic)
                }
                if (valueTopic.hasOwnProperty("expectation")) {

                  this.topic_list.expected.push(valueTopic)
                }
              });
            })
          }
        }
      });
    });
  }


  recap_life_time_topics() {

    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.id,
            recap_complete: 0

          }
        }
      }, {
        relation: "MemberCheckinType",
        scope: {
          include: ["CheckInType",
            {
              relation: "MemberCheckinTopic",
              scope: {
                include: "Topic"
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
                if (value.CheckInType.checkin_name == "Recognition & Appreciation") {
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
                if (value.CheckInType.checkin_name == "Correction (Major)") {
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

      if (count1 == length) {

        this.checkin_topic_reg_lifetime = this.temp_checkin_topic_reg_lifetime;
        this.checkin_topic_corr_lifetime = this.temp_checkin_topic_corr_lifetime;
      }

    });
  }


  recap_goals_task_end_date() {

    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.id,
            recap_complete: 0
          }
        }
      }, {
        relation: "MemberCheckinType",
        scope: {
          include: ["CheckInType",
            {
              relation: "MemberCheckinTopic",
              scope: {
                include: "Topic",
                order: 'end_date DESC'
              }

            }]
        }
      }],
      where: {
        created_by: this.login_user_id,
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
                    if (valueTopic.above_beyond == 1) {
                      this.temp_checkin_topics_above.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });
                    }

                    if (valueTopic.misconduct == 1) {
                      this.temp_checkin_topics_misconduct.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });
                    }

                    if (valueTopic.expectation != "") {
                      this.temp_checkin_topics_expectation.push({
                        topic_id: valueTopic.Topic.id,
                        topic_exp: valueTopic.expectation,
                        extra_data: valueTopic
                      });
                    }



                  });
                }


                //all checkin topic under Recognition type in this period
                if (value.CheckInType.checkin_name == "Goals") {
                  if (value.MemberCheckinTopic != undefined) {
                    value.MemberCheckinTopic.forEach((valueTopic) => {
                      this.temp_checkin_topic_goal.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });

                    });
                  }
                }

                //all checkin topic under Recognition type in this period
                if (value.CheckInType.checkin_name == "Tasks") {
                  if (value.MemberCheckinTopic != undefined) {
                    value.MemberCheckinTopic.forEach((valueTopic) => {
                      this.temp_checkin_topic_task.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });

                    });
                  }
                }

              });

            }
          }
        }
      });

      if (count1 == length) {

        this.checkin_topic_goal = this.temp_checkin_topic_goal;
        this.checkin_topic_task = this.temp_checkin_topic_task;
      }

    });

  }

  recap_goals_task_start_date() {

    this.checkin.find({
      include: [{
        relation: "MemberCheckin",
        scope: {
          where: {
            member_id: this.employee.id,
            recap_complete: 0
          }
        }
      }, {
        relation: "MemberCheckinType",
        scope: {
          include: ["CheckInType",
            {
              relation: "MemberCheckinTopic",
              scope: {
                include: "Topic",
                order: 'start_date ASC'
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
                    if (valueTopic.above_beyond == 1) {
                      this.temp_checkin_topics_above.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });
                    }

                    if (valueTopic.misconduct == 1) {
                      this.temp_checkin_topics_misconduct.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });
                    }

                    if (valueTopic.expectation != "") {
                      this.temp_checkin_topics_expectation.push({
                        topic_id: valueTopic.Topic.id,
                        topic_exp: valueTopic.expectation,
                        extra_data: valueTopic
                      });
                    }



                  });
                }


                //all checkin topic under Recognition type in this period
                if (value.CheckInType.checkin_name == "Goals") {
                  if (value.MemberCheckinTopic != undefined) {
                    value.MemberCheckinTopic.forEach((valueTopic) => {
                      this.temp_checkin_topic_goal_start.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });

                    });
                  }
                }

                //all checkin topic under Recognition type in this period
                if (value.CheckInType.checkin_name == "Tasks") {
                  if (value.MemberCheckinTopic != undefined) {
                    value.MemberCheckinTopic.forEach((valueTopic) => {
                      this.temp_checkin_topic_task_start.push({
                        topic_id: valueTopic.Topic.id,
                        topic_name: valueTopic.Topic.topic_name,
                        extra_data: valueTopic
                      });

                    });

                  }
                }




              });

            }
          }
        }
      });

      if (count1 == length) {

        // if(this.employee.goals == true){       
        this.checkin_topic_goal_start = this.temp_checkin_topic_goal_start;
        // }
        // if(this.employee.tasks == true){ 
        this.checkin_topic_task_start = this.temp_checkin_topic_task_start;
        // }
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
      this.selectedCheckinTopic.push({ name: topic.topic_name, id: topic.topic_id });
      if (this.selectedCheckinTopic.length > 2) {
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.checkinTopicSelectNumber = true;
      } else {
        this.checkinTopicSelectNumber = false;
      }
    }
    else {

      this.selectedCheckinTopic.map((item: any, index: any) => {
        if (topic.topic_id == item.topic_id) {
          this.selectedCheckinTopic.splice(index, 1);
        }
      })

      if (this.selectedCheckinTopic.length > 2) {
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.checkinTopicSelectNumber = true;
      } else {
        this.checkinTopicSelectNumber = false;
      }
    };
    //setting select checkin
    //this.checkin_name = type.checkin_name;

  }

  recapSubmit(status) {
    var recap_data_save = {};
    recap_data_save = {
      // checkin_id: this.checkin_id,
      member_id: this.employee.id,
      created_by: localStorage.getItem('user_id'),
      is_goal: this.goals,
      is_task: this.tasks,
      is_assessment: this.assessment,
      goal_achieved: this.goalAchieved,
      individual_standards: this.individual_standards,
      member_performance: this.employee_performance,
      additional_responsibility: this.additional_responsibility,
      complete_growth_plan: this.complete_growth_plan,
      creator_note: this.manager_notes,
      member_note: this.employee_notes,
      save_status: status,
      ack_send: 0,
      ack_receive: 0,
      pulse_survey: 0,

    }


    if (this.recap_id != '') {
      recap_data_save['id'] = this.recap_id;
      recap_data_save['recap_date'] = this.recap_date;
    }
    else {
      recap_data_save['recap_date'] = this.date.value;
    }
    this.recap.patchOrCreate(recap_data_save).subscribe((data) => {
      this.insert_strenth_opp_array = [];
      this.insert_topic_comp_array = [];
      var arr_1 = Object.keys(this.most_tag_rec_recap_period);
      arr_1.forEach((id) => {
        if (this.most_tag_rec_recap_period[id] == true) {
          this.insert_strenth_opp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "S",
            period: "R"
          })
        }
      })

      var arr_2 = Object.keys(this.most_tag_reg_recap_lifetime);
      arr_2.forEach((id) => {
        if (this.most_tag_reg_recap_lifetime[id] == true) {
          this.insert_strenth_opp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "S",
            period: "L"
          })
        }
      })


      var arr_3 = Object.keys(this.most_tag_corr_recap_period);
      arr_3.forEach((id) => {
        if (this.most_tag_corr_recap_period[id] == true) {
          this.insert_strenth_opp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "O",
            period: "R"
          })
        }
      })


      var arr_4 = Object.keys(this.most_tag_corr_recap_lifetime);
      arr_4.forEach((id) => {
        if (this.most_tag_corr_recap_lifetime[id] == true) {
          this.insert_strenth_opp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "O",
            period: "L"
          })
        }
      })


      //------------goal achieved and task completion

      //goals end date
      var arr_5 = Object.keys(this.topic_goal_end_date);
      arr_5.forEach((id) => {
        if (this.topic_goal_end_date[id] == true) {
          this.insert_topic_comp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "G",
            task_complete: 0
          })
        }
      })


      //goals end date
      var arr_6 = Object.keys(this.topic_goal_start_date);
      arr_6.forEach((id) => {
        if (this.topic_goal_start_date[id] == true) {
          this.insert_topic_comp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "G",
            task_complete: 0
          })
        }
      })

      //tasks end date
      var arr_7 = Object.keys(this.topic_task_end_date);
      arr_7.forEach((id) => {
        if (this.topic_task_end_date[id] == true) {
          this.insert_topic_comp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "T",
            task_complete: this.taskComplete
          })
        }
      })

      //console.log("test",this.taskComplete)

      //tasks start date
      var arr_8 = Object.keys(this.topic_task_start_date);
      arr_8.forEach((id) => {
        if (this.topic_task_start_date[id] == true) {
          this.insert_topic_comp_array.push({
            recap_id: data['id'],
            topic_id: id,
            type: "T",
            task_complete: this.taskComplete
          })
        }
      })
      this.recap.delete_recap_details(data['id']).subscribe((deleted) => {

        //insert to strength and oppurtunity table   
        this.recapStrenthOpportunity.create(this.insert_strenth_opp_array
        ).subscribe((dataOpp) => {


          //insert to topic completion table
          this.recapTopicCompletion.create(this.insert_topic_comp_array
          ).subscribe((dataComp) => {

            if (status == 1) {
               this.snackBar.open('Recap Saved Successfully', '', {
                duration: 2000

              });

              // this.memberCheckinApi.find({
              //   where: {
              //     // checkin_id: this.checkin_id,
              //     member_id: this.employee.id,
              //     recap_complete: 0
              //   }
              // }).subscribe((res3) => {
              //   var memberCheckin = JSON.parse(JSON.stringify(res3));
              //   var member_checkin_data = memberCheckin[0]
              //   member_checkin_data['recap_complete'] = 1;
              //   console.log('fdsfsd', member_checkin_data)
              //   if (memberCheckin.length > 0) {
              // this.memberCheckinApi.patchAttributes(member_checkin_data.id, member_checkin_data).subscribe((res3) => {

              //   var recap_id_ack = data['id']
              //   this.gotoAcknowledge(recap_id_ack)
              // });
              //   } else {


              var recap_id_ack = data['id']
              this.gotoAcknowledge(recap_id_ack)
              


              //   }

              // });
            } else {
              var toast = this.snackBar.open('Recap drafted', '', {
                duration: 2000
              });
              //this.init();

               toast.afterDismissed().subscribe(() => {
                this.router.navigate(['/' + this.url_params + '/dashboards']); 
              });
            }

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
        (errorDelete) => {
          this.snackBar.open('Some Error Occured!', '', {
            duration: 2000
          });
        });

    },
      (errorDat1asda) => {
        // console.log("not created")
        this.snackBar.open('Some Error Occured!', '', {
          duration: 2000
        });
      })
  }






  gotoAcknowledge(id) {
    // console.log('id', id)
    this.recap_id=id;
    this.current_stage = 4;

    // this.recap_details = {};
    // this.strength_recap = [];
    // this.strength_lifetime = [];
    // this.oppurtunity_recap = [];
    // this.oppurtunity_lifetime = [];
    // this.completed_goal = [];
    // this.incompleted_goal = [];
    // this.completed_task = [];
    // this.incompleted_task = [];
    // this.recap.find({
    //   where: {
    //     id: id,
    //     save_status: 1
    //   },
    //   include: [{
    //     "relation": "TopicCompletion", scope: {
    //       include: [{ "relation": "Topic" }]
    //     }
    //   }, {
    //     "relation": "StrenthOppurtunity", scope: {
    //       include: [{ "relation": "Topic" }]
    //     }
    //   }, { "relation": "Checkin" }]
    // }).subscribe((res) => {
    //   var data = JSON.parse(JSON.stringify(res));
    //   console.log('data Recap: ', data)

    //   this.recap_details = data[0];
    //   this.current_stage = 4;
    //   this.recap_details.StrenthOppurtunity.map((d) => {
    //     console.log('data', d)
    //     if (d.type == 'S') {
    //       if (d.period == 'R') {
    //         this.strength_recap.push(d);

    //       } else {

    //         this.strength_lifetime.push(d);
    //       }
    //     }
    //     else if (d.type == 'O') {
    //       if (d.period == 'R') {
    //         this.oppurtunity_recap.push(d);
    //       }
    //       else {

    //         this.oppurtunity_lifetime.push(d);
    //       }
    //     }
    //     else {

    //     }
    //   })
    //   this.recap_details.TopicCompletion.map((d) => {
    //     console.log('data', d)
    //     if (d.type == 'G') {
    //       if (d.task_complete == 1) {

    //         this.completed_goal.push(d);
    //       }
    //       else {

    //         this.incompleted_goal.push(d);
    //       }
    //     }
    //     else if (d.type == 'T') {
    //       if (d.task_complete == 1) {
    //         this.completed_task.push(d);
    //       }
    //       else {

    //         this.incompleted_task.push(d);
    //       }
    //     }
    //     else {

    //     }
    //   })

    // })
  }

  sendSummaryEmployee() {
    // alert('Updated To The Manager');
    // this.init();
    this.need_emp_ack=false;
    var a=this.snackBar.open('Employee acknowledge accepted', '', {
      duration: 2000
    });
    a.afterDismissed().subscribe(() => {
      // console.log('The snack-bar was dismissed');
    });


  }

  sendSummary() {
    var data = { 
      recap_id: this.recap_id,
       acknowledge: this.need_emp_ack,
       }
    this.recap.sendRecapSummaryMail(data).subscribe((res) => {
    }); 

    // alert('Updated To The Manager');
    var toast = this.snackBar.open('Mail sent succesfully', '', {
      duration: 2000
    });
    
      //this.init();

     toast.afterDismissed().subscribe(() => {
        this.router.navigate(['/' + this.url_params + '/dashboards']); 
      });
    
  }


}
