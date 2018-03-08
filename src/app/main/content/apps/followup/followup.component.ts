import { Component, OnInit, ElementRef, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';
import { FollowUpApi } from '../../../../core/sdk/services/index'


@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent implements OnInit {

  followup: FormGroup;
  typeName: any;
  selectedDate: any;
  pipNotes: any;
  selectedDays: any;
  selectedPipTopic: any;
  pipData: any;
  
  constructor(
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private followUpApi : FollowUpApi, 
    public dialogRef: MatDialogRef < FollowupComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      console.log("typeName:", data.typeName);
      this.typeName = data.typeName;
      console.log("selectedDate:", data.selectedDate);
      this.selectedDate = data.selectedDate;
  }

  ngOnInit() {
    this.followup = this.formBuilder.group({
      /*selectedDays : ['', ] 
      checked: ['',],
      selectedDay : ['', ] 
      /*expectations: ['', Validators.required],
      future: [false, Validators.required],
      critical: [false, Validators.required] */
    });
  }

  selectChange(event, value){
    console.log("event.check:" , event.checked);
    console.log("event.value:" , event.source.name);
    this.selectedPipTopic = event.source.name
  }

  
  createFollowUp() {
    console.log("selectedDays:",  this.selectedDays);
    console.log("pipNotes:", this.pipNotes);
    console.log("pipTopic: ", this.selectedPipTopic);
      
    this.followUpApi.create({"pip_topic_name" :  this.selectedPipTopic,
        "pip_notes": this.pipNotes,   "corrective_action_days": this.selectedDays
                , "topicTypeName" : this.typeName, "pipDate": this.selectedDate }).subscribe(
                  (res) => {
                      console.log("res: ", res)
                      this.pipData = res;
                      this.snackBar.open('Successfully Created ', '', {
                        duration: 2000
                      });
                      this.dialogRef.close(res);
                  }, (error) => {
                      console.log("error: ", error);
                   });
                
  }
  
  
  addNotes($event, value){
    console.log("$event: " ,$event);
    console.log("value: ", value);
    this.pipNotes = value;
  }
}
