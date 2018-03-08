import { Component, OnInit } from '@angular/core';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboards',
  templateUrl: './employee-dashboards.component.html',
  styleUrls: ['./employee-dashboards.component.scss']
})
export class EmployeeDashboardsComponent implements OnInit {

  checkIns: any;
  endpicker : Date;
  startpicker: Date;
  filterCheckin: FormGroup;
  member_id: any;
  checkInSummary: any;
  managerDetails: any; 
  checkInsString : any[];
  checkIN: {} = {};
  checkINRating: {} = {}
  checkINRatingString: any[]

  minDate:any
  constructor(private formBuilder: FormBuilder, private checkinApi : CheckinApi,
  ) { }

  ngOnInit() {

    this.member_id = localStorage.getItem('userId')
    console.log("member_id: ", this.member_id);

    this.filterCheckin = this.formBuilder.group({
      startpicker: ['',  Validators.required],
      endpicker: ['', Validators.required]
    })
  }


  selectDate(startpicker){
    console.log("startpicker: ", startpicker);
    //this.endpicker = startpicker
    this.minDate = startpicker;
    console.log("minDate: ", this.minDate);
   
  }

  filterCheckIn(){

    console.log("endpicker:", this.filterCheckin.value.endpicker);
    console.log("iso_end: ", (this.filterCheckin.value.endpicker).toISOString());
    console.log("startpicker:", this.filterCheckin.value.startpicker);
    
    console.log("iso_start: ", (this.filterCheckin.value.startpicker).toISOString());

    this.checkinApi.find({
      where: {
        member_id: this.member_id,
        and: [{ createdAt: { gte: (this.filterCheckin.value.startpicker).toISOString() } }, 
            { createdAt: { lte:(this.filterCheckin.value.endpicker).toISOString() } }]
      },

      include: { relation: "Manager"}

     }).subscribe((res) => { 
            this.checkIns = res;
            console.log("total checkins: ", this.checkIns);
            /* for(let i=0; i < this.checkIns.length; i++){
                console.log("checkInSummary: ", this.checkIns[i].summary);
                this.checkInSummary = this.checkIns[i].summary;
                //this.managerDetails = this.checkIns[i].Manager.first_name
                //console.log("managerDetails: ", this.managerDetails);
            } */

            this.checkIns.map((item:any)=>{
              //console.log("item.id: ", item);
              this.checkInsString = [];
              this.checkINRatingString = [];
              for(let j in  item.summary){
                console.log("j: ", item.summary[j]);
                //console.log("type_name: ", item.TopicType[j].type_name);
                this.checkInsString.push(item.summary[j].name);
                this.checkINRatingString.push((item.summary[j].rating));
              }
              console.log("this.topicsString=",this.checkInsString);
              console.log("this.topicsString=",this.checkInsString[0]);
              if(this.checkInsString[0] != "") {
                //console.log("null....")
                this.checkIN[item.id] =   this.checkInsString
              } 

              if(this.checkINRatingString[0] != "") {
                //console.log("null....")
                this.checkINRating[item.id] =   this.checkINRatingString
              } 
        
            })
   
      })

  }
}
