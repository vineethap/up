import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatChipInputEvent, MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule,MatSnackBar } from '@angular/material';
import { TopicType } from '../../../../../core/sdk/models/TopicType';
import { TopicTypeApi } from '../../../../../core/sdk/services/custom/TopicType';
import { Topic } from '../../../../../core/sdk/models/Topic';
import { TopicApi } from '../../../../../core/sdk/services/custom/Topic';
import {ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edittopic',
  templateUrl: './edittopic.component.html',
  styleUrls: ['./edittopic.component.scss']
})
export class EdittopicComponent implements OnInit {

  model: any = {};
  editTopic: FormGroup;
  formErrors: any;
  new_file_name: any;
  subCategories: any;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER];

  editsubCategories = [
    
  ];
  
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
  
    // Add our person
    if ((value || '').trim()) {
      this.editsubCategories.push({ name: value.trim() });
    }
  
    // Reset the input value
    if (input) {
      input.value = '';
    }
  } 
  
  remove(subcat: any): void {
    console.log("editsubCategories: ", this.editsubCategories);
    console.log("subcat: ", subcat);
    let index = this.editsubCategories.indexOf(subcat); 
    console.log("index: ", index);

    if (index >= 0) {
      this.editsubCategories.splice(index, 1);
    }
  }

  constructor(private formBuilder: FormBuilder,
    public http: Http,
    public snackBar: MatSnackBar,
    private el: ElementRef,
    public topicTypeApi:TopicTypeApi,
    public topicApi: TopicApi,
    public dialogRef: MatDialogRef < EdittopicComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.formErrors = {
        topic_name: {}
      };
      
    }

  ngOnInit() {
  
    console.log("Data: ", this.data.topicdetails.id);

    this.topicTypeApi.find({
      where: { is_delete: 0, categoryId : this.data.topicdetails.id},
      order: 'createdAt DESC'
      
    }).subscribe((res) => {
       this.subCategories = res;
       console.log("res: ", this.subCategories);
       console.log("res: ", this.subCategories.length);
       for(let i=0 ; i < this.subCategories.length; i++){
          console.log("this.subCategories[i]: ", this.subCategories[i].type_name);
          this.editsubCategories.push({ name: this.subCategories[i].type_name });
          
       }
       //this.editsubCategories.
       console.log("editsubCategories: ", this.editsubCategories);

    })

    //console.log("subCategories: ", this.subCategories);

    this.editTopic = this.formBuilder.group({
      topic_name: [this.data.topicdetails.topic_name, [Validators.required]]
      
    });

    this.editTopic.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.editTopic.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  updateTopic() {
    // console.log(this.editFranchise.value)
    //this.editSubscription.value.password = this.data.franchisedetails.UDA;

    this.topicTypeApi.deleteAllSubTopics({topicId: this.data.topicdetails.id }).subscribe(
      (res) => {
          this.snackBar.open("Deleted successfully", "", {
          duration: 2000,
        });
      });


    this.topicApi.patchAttributes(this.data.topicdetails.id, this.editTopic.value)
      .subscribe(
        data => {
          //let topicId = data.id;
          console.log("data_topic", data.id);
          console.log("editsubCategories: ", this.editsubCategories);
          this.snackBar.open("Edited successfully", "", {
            duration: 2000,
          });
          
          for (var type_name of this.editsubCategories) {
            console.log("sub_categ_name", type_name)
            //console.log("sub_categ_name", type_name.name)

             if((type_name.name) != null){
              
              this.topicTypeApi.create({"type_name": type_name.name, 
                "categoryId": data.id}).subscribe(
                (data) => {
                  //console.log("data_subtopic", data.id)
                  
                  this.snackBar.open(' Edited Sub Category !', '', {
                    duration: 2000
                  });
                }, (error) => {
                  this.snackBar.open(' Wrong Sub Category !', '', {
                    duration: 2000
                  });
              }); 
            } 
          } 

          this.dialogRef.close(data);
        },
        error => {

          this.snackBar.open("Some error occured", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
  }
}
