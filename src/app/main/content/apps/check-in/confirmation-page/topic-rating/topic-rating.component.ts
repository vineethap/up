import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckinApi } from '../../../../../../core/sdk/services/index';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FollowupComponent } from '../../../followup/followup.component';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
//import { EventEmitter } from '@angular/core/src/event_emitter';


@Component({
  selector: 'app-topic-rating',
  templateUrl: './topic-rating.component.html',
  styleUrls: ['./topic-rating.component.scss']
})
export class TopicRatingComponent implements OnInit {
  noteFrom: FormGroup;
  @Input() topics: any;
  @Input() checkin_details: any;
  @Input() selected: any;
  data_from_prev = {};
  dialogRef: any;
  @Output() pipData: EventEmitter<any> = new EventEmitter<any>();

  // @Input('master') masterName: string;
  constructor(private checkin: CheckinApi,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe

  ) {

  }

  ngOnInit() {
    this.noteFrom = this.formBuilder.group({
      date: [new Date(), Validators.required],
      expectations: ['', Validators.required],
      future: [false, Validators.required],
      critical: [false, Validators.required]


    });
    this.data_from_prev = this.checkin_details;
  }
  // selectRating(topic, value) {
  //   if (value == 1) {
  //     this.dialogRef = this.dialog.open(FollowupComponent, {

  //       panelClass: 'mail-compose-dialog'
  //     });
  //     this.dialogRef.afterClosed().subscribe(result => {
  //       // console.log("hhhhhhh", result)
  //       if (result != undefined && result != false) {

  //       }

  //     });
  //   }
  //   // else{
  //   this.checkin.find({ where: { id: this.checkin_details.id } }).subscribe((res: any) => {
  //     var data = res[0];
  //     if (data.summary[topic.id].hasOwnProperty('name')) {

  //     } else {
  //       data.summary[topic.id].name = topic.type_name;
  //     }
  //     data.summary[topic.id].rating = value;
  //     this.checkin.upsert(data).subscribe((resp) => {
  //       console.log("rating", resp)
  //     })
  //   })
  //   // }

  // }
  addNotes(event, value, topic) {
    console.log("herenotes")
    // if(event.keyCode == 13) { 
    this.checkin.find({ where: { id: this.checkin_details.id } }).subscribe((res: any) => {
      var data = res[0];
      if (data.summary[topic.id].hasOwnProperty('name')) {

      } else {
        data.summary[topic.id].name = topic.type_name;
      }
      data.summary[topic.id].notes = value;

      this.checkin.upsert(data).subscribe((resp) => {
        console.log(resp, "response")
      })
    })
    // }
    // console.log(x,value)   
  }

  addEvent(typeName, event){
    //console.log("nnnnnnnnnnnnnn",event);
    console.log("selectedDate:", event.value);
    console.log("typeName:", typeName);
    var selectedDate = this.datePipe.transform( event.value, 'dd/MM/yyyy');
    console.log("selectedDate:", selectedDate);
    this.dialogRef = this.dialog.open(FollowupComponent, {
      data: {
        typeName :  typeName,
        selectedDate : selectedDate
        //memberdetails: editrow
      },
      panelClass: 'mail-compose-dialog'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log("followUP: ", result);
      //this.pipData = result;
      this.pipData.emit(result);
      //this.ngOnInit()

    }); 
  }

}
