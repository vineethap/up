import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choose-elements',
  templateUrl: './choose-elements.component.html',
  styleUrls: ['./choose-elements.component.scss']
})
export class ChooseElementsComponent implements OnInit {
  @Input() employee: any;
  next = false;
  backbtn = false;
  goals = false;
  tasks = false;
  assessment = false;
  constructor() {}


  ngOnInit() {}
  nextButton() {

    var recapDetails = sessionStorage.getItem('recapDetails');
    console.log("recapDetails",recapDetails)
 
    this.employee = {
      employee_id: this.employee.employee_id,
      name: this.employee.name,
      //start_date: this.employee.start_date,
      //end_date: this.employee.end_date,  
      recap_date: this.employee.recap_date, 
      checkin_id: this.employee.checkin_id,  
      goals: this.goals,
      tasks: this.tasks,
      assessment: this.assessment
    }
    this.next = true;
  }
  backClicked() {
    this.backbtn = true;
  }

}
