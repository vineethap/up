import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Topic } from '../../../../core/sdk/models/Topic';
import { TopicApi } from '../../../../core/sdk/services/custom/Topic';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule,MatSnackBar } from '@angular/material';

import { AddtopicComponent } from './addtopic/addtopic.component';
import { EdittopicComponent } from './edittopic/edittopic.component';
import { DeletetopicComponent } from './deletetopic/deletetopic.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topic: any = {};
  /* newSubscription: FormGroup;
  formErrors: any; */
  dialogRef: any;
  rows: any[];
  temp:any[];
  table = {
    offset: 0,
  };
  
  topicSet: any;
  subTopicSet: any;
  subTopicModel: {} = {};
  topicsString : any[];
  userType : any;
  currentSession : any;
  /* subTopicSet: {};
  subTopics: any;
  subTopicModel: {} = {};
  topicsString : any[];
 */
  constructor(private formBuilder : FormBuilder,
      public TopicApi : TopicApi,
      public snackBar: MatSnackBar,
  	  public dialog : MatDialog) {

        /* this.formErrors = {
          subscription_name: {},
          subscription_type : {},
          subscription_count : {},
          subscription_amount : {}
        }; */

  }

  ngOnInit() {

  this.userType = localStorage.getItem("userType")
  console.log("userType: ", this.userType);
  if(this.userType == "Franchise"){
    console.log("franhiseID: ", localStorage.getItem("userId"));
    this.TopicApi.find({
      where: { 
        is_delete: 0,

        or: [{ 
        fran_userId : { "like" : localStorage.getItem("userId") }},
        {
          and: [{ manager_userId: {undefined}},
          { fran_userId: {undefined}}]
        }]

      },
      order: 'createdAt DESC',
      include: { relation: "TopicType" },
   }).subscribe((res) => { 
        this.topicSet = res;
        console.log("topicSet: ", this.topicSet);
    })
  }
  else if(this.userType == "Manager"){
    console.log("managerID: ", localStorage.getItem("userId"));
    this.currentSession = sessionStorage.getItem('currentUser');
    console.log("currentcurrentSession: ", JSON.parse(this.currentSession).id);

    /* or: [
      { and: [{ manager_userId: { "like" : localStorage.getItem("userId")}},
             {fran_userId: { "like" : JSON.parse(this.currentSession).id }}] },
      { and: [{ manager_userId: undefined},
      { fran_userId: { "like" : JSON.parse(this.currentSession).id }}] },
    ] */

    this.TopicApi.find({
      where: {
        is_delete: 0,
        or: [{ 
          and: [
            {fran_userId: { "like" : JSON.parse(this.currentSession).id }},
            { manager_userId: {undefined}}]
          },{ 
          and: [{ manager_userId: { "like" : localStorage.getItem("userId")}},
            { fran_userId: { "like" : JSON.parse(this.currentSession).id }}] 
          },
          {
          and: [
            {fran_userId:  {undefined} },
            { manager_userId: {undefined}}] 
          
        }]
      },
      order: 'createdAt DESC',
      include: { relation: "TopicType" },
   }).subscribe((res) => { 
        this.topicSet = res;
        console.log("topicSet: ", this.topicSet);
        //console.log("topicSet: ", this.topicSet[0].manager_userId);
        //console.log("topicSet: ", this.topicSet[1].manager_userId);
    })
  }

   /* this.TopicApi.find({
       where: { is_delete: 0,
        userId : { "like" :this.userId }},
       order: 'createdAt DESC',
       include: { relation: "TopicType" },
    }).subscribe((res) => {
        this.topicSet = res;
        this.temp = res; */
        //console.log("topicSet: ", this.topicSet);
        //console.log("topicSet_length: ", this.topicSet[0].TopicType);
        //this.subTopicSet = this.topicSet[0].TopicType
        //console.log("subTopicSet: ", this.subTopicModel);

        /* this.topicSet.map((item:any)=>{
          //console.log("item.id: ", item);
          this.topicsString = [];

          for(let j in  item.TopicType){
            //console.log("j: ", item.TopicType[j]);
            //console.log("type_name: ", item.TopicType[j].type_name);
            this.topicsString.push(item.TopicType[j].type_name);
          }
          console.log("this.topicsString=",this.topicsString);
          console.log("this.topicsString=",this.topicsString[0]);
          if(this.topicsString[0] != "") {
            //console.log("null....")
            this.subTopicModel[item.id] =   this.topicsString
          }
          //console.log("this.subTopicModel[item.id]=", this.subTopicModel[item.id]);
          //console.log("this.subTopicModel[item.id]=", this.subTopicModel[item.id].length);
        }) */
      
    //})

  } 

  createNewTopicModel() {
    this.dialogRef = this.dialog.open(AddtopicComponent, {
      panelClass: 'mail-compose-dialog'
    });
    
    this.dialogRef.afterClosed().subscribe(result => {
      //console.log("result_create: ", result);
      //if(result != undefined || result != false){
        //console.log("result_create: ", result);
        this.topicSet.push(result);
        this.ngOnInit()
      //}
    });
  }

  editTopic(editrow) {
    console.log("editrow: ", editrow);
    this.dialogRef = this.dialog.open(EdittopicComponent, {
      data: {
        topicdetails: editrow
      },
      panelClass: 'mail-compose-dialog'
    });

    this.dialogRef.afterClosed().subscribe(result => {

      this.ngOnInit()

    });
  }

  deleteTopic(deleterow) {
    //console.log("deleteROw: ", deleterow)
    this.dialogRef = this.dialog.open(DeletetopicComponent, {
      data: {
        topicdetails: deleterow
      },
      panelClass: 'mail-compose-dialog'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      //console.log("result_delete: ", result);
      //if (result != undefined || result != false) {
        //console.log("result_delete: ", result);
        this.topicSet.splice(deleterow.$$index, 1)
        this.ngOnInit();
      //}
      
    });
  } 


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return ((d.topic_name.toLowerCase().indexOf(val) !== -1 || !val));
    });
    this.topicSet = temp;
    this.table.offset = 0;
  }

}

