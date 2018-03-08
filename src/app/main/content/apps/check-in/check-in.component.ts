import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MemberApi } from '../../../../core/sdk/services/index';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})

export class CheckInComponent implements OnInit {
  employees: any[];
  checkinStart: FormGroup;
  temp = [];
  nextbutton = false;

  
  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi
  ) {
  }
  
  
  ngOnInit() {
    var userId = localStorage.getItem('userId');
    this.checkinStart = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date(), Validators.required]

    });
    // this.member.find({
    //   where: {
    //     userTypeId: 4
    //     // "franchise_id":  userId 
    //     // "manager_id": { "eq": userId }
    //   }

    // }).subscribe((res) => {
    //   console.log("bbbbbbbbb",res)
    //   this.employees = res;
    //   this.temp = res;
    // });
    // this.checkinStart.valueChanges.subscribe(() => {
    //   this.onFormValuesChanged();
    // });

  }



  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return (d.first_name.toLowerCase().indexOf(val) !== -1 || !val);
    });
    this.employees = temp;

  }



}
