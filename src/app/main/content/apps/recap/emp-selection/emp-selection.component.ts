import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { RecapApi } from '../../../../../core/sdk/services/index';
import { MatAutocompleteTrigger, MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-emp-selection',
  templateUrl: './emp-selection.component.html',
  styleUrls: ['./emp-selection.component.scss']
})
export class EmpSelectionComponent implements OnInit {
  @Input() employee: any;

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

  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    public checkin: CheckinApi,
    public snackBar: MatSnackBar,
    public recap: RecapApi,
  ) {}

  ngOnInit() {
    this.empTextFiled = "";

    var userId = localStorage.getItem('user_id');
    this.empSelection = this.formBuilder.group({
      name: [this.employee ? this.employee.name : '', Validators.required],
      date: [this.employee ? this.employee.date : new Date(), Validators.required]

    });


 /*   this.recap.find({
      order: 'recap_date DESC',
      limit: 1
    }).subscribe((data) => {*/

      /*if(data.length != 0){
        var Data1 = JSON.parse(JSON.stringify(data));
        this.start_date = Data1[0].recap_date;
      } else {
        this.start_date = this.empSelection.value.date;
      }*/
      //this.start_date = this.empSelection.value.date;
      //this.end_date = this.empSelection.value.date;



    //var startDate=new Date(this.start_date);
    //startDate.setHours(0,0,0,0);
    //var endDate=new Date(this.end_date);
    //endDate.setHours(23,59,59,999);


      this.recap_date = this.empSelection.value.date;


      //employees listing who is still not recaped
      this.checkin.find({
        include: {
          relation: "MemberCheckin",
          scope: {
            include: "Member",
            where:{
              recap_complete: 0
            }
          }
        },
        where: {
          created_by: userId,
          save_status: 1
          //"checkin_date":{between:[startDate,endDate]}
          /*and: [{
            checkin_date: {
              gt: new Date(this.start_date)
            }
          }, {
            checkin_date: {
              lt: new Date(this.end_date)
            }
          }]*/
        }
      }).subscribe((res) => {
   
        var Data = JSON.parse(JSON.stringify(res));
        var nameArr = [];
        Data.forEach((item) => {
          if (item.MemberCheckin != undefined) {
            item.MemberCheckin.forEach((value) => {
              if (value.Member != undefined) {
                value.Member['checkin_id']=value.checkin_id
                nameArr.push(value.Member);               
              }
            })
          }
        });


        //unique user from the user list
        /*  var commonUser = [];
              nameArr.first_name.forEach(function(userSingle) {
                  if (commonUser.indexOf(userSingle) == -1) {
                      commonUser.push(userSingle);
                  }
              });
        */

        this.employees = nameArr;
        this.temp = nameArr;
      });


    //});


    // this.empSelection.valueChanges.subscribe(() => {
    //   this.onFormValuesChanged();
    // });
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

  getEmployeeId(id,checkin_id) {    
    this.empTextFiled = "";
    this.employee_user_id = id;
    this.checkin_id = checkin_id;
    //console.log("employee_user_id_getEmployeeId: ", this.employee_user_id);
    //console.log"("name: ", name);
    // this.multiSelectedEmp = "";
    // this.multiSelectedEmp += name + ", ";
    // console.log("multiSelectedEmp: ", this.multiSelectedEmp); 
  }

  nextButton() {
    this.employe_data = {
      employee_id: this.employee_user_id,
      name: this.empSelection.value.name,
      //start_date: this.start_date,
      //end_date: this.end_date,
      recap_date: this.recap_date,
      checkin_id: this.checkin_id
    }
    this.next = true;
  }



}
