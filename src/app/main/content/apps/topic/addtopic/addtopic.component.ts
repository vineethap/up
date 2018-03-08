import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule,MatSnackBar } from '@angular/material';
import { Topic } from '../../../../../core/sdk/models/Topic';
import { TopicApi } from '../../../../../core/sdk/services/custom/Topic';

import { TopicType } from '../../../../../core/sdk/models/TopicType';
import { TopicTypeApi } from '../../../../../core/sdk/services/custom/TopicType';

import * as _ from "lodash";
import {ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.scss']
})
export class AddtopicComponent implements OnInit {

  topic: any = {};
  newTopic: FormGroup;
  formErrors: any;
  rows: any[];
  topicdetails: any[];
  already_exists = false;
  arraylist: any;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  fran_userId : any;
  manager_userId : any;
  currentSession : any;

  // Enter, comma
  separatorKeysCodes = [ENTER];
  
    subCategories = [
      
    ];
  
    add(event: MatChipInputEvent): void {
      let input = event.input;
      let value = event.value;
      console.log("value",value)
      // Add our person
      if ((value || '').trim()) {
        this.subCategories=this.subCategories.filter(function(d){
          if(d.name!=value.trim()){
            return d
          }
        })
        this.subCategories.push({ name: value.trim() });
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(subcat: any): void {
      console.log("subcategories: ", this.subCategories);
      console.log("subcat: ", subcat);
      let index = this.subCategories.indexOf(subcat);
      console.log("index: ", index);

      if (index >= 0) {
        this.subCategories.splice(index, 1);
      }
    }

  constructor(private formBuilder : FormBuilder,
      public topicApi : TopicApi,
      public topicTypeApi: TopicTypeApi,
      public snackBar: MatSnackBar,
      private el: ElementRef,
      public dialog : MatDialog,
      public dialogRef: MatDialogRef < AddtopicComponent > ,
      @Inject(MAT_DIALOG_DATA) public data: any) {

        this.formErrors = {
          topic_name: {},
          type_name : {}
        };

  }

  ngOnInit() {

    if(localStorage.getItem("userType") == "Franchise"){
      this.fran_userId = localStorage.getItem("userId")
      console.log("Franchise_userId: ", this.fran_userId);
      this.newTopic = this.formBuilder.group({
        topic_name: ['', Validators.required],
        fran_userId : this.fran_userId
    
      });
    }
    else if(localStorage.getItem("userType") == "Manager"){
      this.manager_userId = localStorage.getItem("userId")
      console.log("Manager_userId: ", this.manager_userId);

      this.currentSession = sessionStorage.getItem('currentUser');
      console.log("currentcurrentSession: ", JSON.parse(this.currentSession).id);
       this.newTopic = this.formBuilder.group({
        topic_name: ['', Validators.required],
        fran_userId: JSON.parse(this.currentSession).id
      });
    } 
    
    this.newTopic.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  /* initItemRows() {
    return this.formBuilder.group({
      type_name: ['', ]
    });
  

  addNewRow() {
    const control = < FormArray > this.newTopic.controls['itemRows'];
    control.push(this.initItemRows());
  } */

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.newTopic.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  //creating new subscription
  createNewTopic(){
    
    //alert("create subscription")
    console.log("topic_name", this.newTopic.value.topic_name);
        
    //console.log("subCategories:", this.subCategories);
    /*  for (var value of this.subCategories) {

        console.log("sub category value: ", value);
    }
    */
    this.topicApi.create(this.newTopic.value)
      .subscribe(
          (res) => {
            //console.log("data_topic",typeof (res));
            //console.log("data_topic", res.id);
            console.log("data_topic", res.id);
            this.snackBar.open(' Created Categroy !', '', {
              duration: 2000
            });

            for (var type_name of this.subCategories) {
              console.log("sub_categ_name", type_name)
              console.log("sub_categ_name", type_name.name)

              if((type_name.name) != null){
                  
                this.topicTypeApi.create({"type_name": type_name.name, 
                  "categoryId": res.id}).subscribe(
                  (data) => {
                    //console.log("data_subtopic", data.id)
                      
                    this.snackBar.open(' Created Sub Category !', '', {
                      duration: 2000
                    });
                  }, (error) => {
                    this.snackBar.open(' Wrong Sub Category !', '', {
                       duration: 2000
                    });
                }); 
              } 
            } 
            this.dialogRef.close(res);

          }, (error) => {
            this.snackBar.open(' Wrong Topic !', '', {
              duration: 2000
            });
          });    
        
    } 
 

  //check for duplicate
  checkTopicName() {
     
    console.log("on blur")  
    var name = this.newTopic.value.topic_name;
    this.topicApi.find({
    
      }).subscribe((res) => {
        this.rows = res;
    
        this.topicdetails = _.find(this.rows, function(o) {
    
          return o.topic_name == name;
        });
    
        if (this.topicdetails == undefined) {
          this.already_exists = false;
        } else {
          this.already_exists = true;
        }
    
      }, (error) => {
         console.log("Server error");
      });
    
  } 
}
