import { Component, OnInit } from '@angular/core';
import { RecapApi } from '../../../../../core/sdk/services/index';

@Component({
  selector: 'app-recap-confirmation-page',
  templateUrl: './recap-confirmation-page.component.html',
  styleUrls: ['./recap-confirmation-page.component.scss']
})

export class RecapConfirmationPageComponent implements OnInit {

  recap_details:any;
  strength_recap:any;
  strength_lifetime:any;
  oppurtunity_recap:any;
  oppurtunity_lifetime:any;
  completed_goal:any;
  incompleted_goal:any;
  completed_task:any;
  incompleted_task:any;

  constructor(public recapApi : RecapApi) { }

  ngOnInit() {

      this.recapApi.find({
        where:{
          id: "5a61820df3c47211f857d93f",
          save_status:1
        },
        include:[{"relation":"TopicCompletion",scope:{
          include:[{"relation":"Topic"}]
        }},{"relation":"StrenthOppurtunity",scope:{
          include:[{"relation":"Topic"}]
        }},{"relation":"Checkin"}]
      }).subscribe((res) => {
        var data = JSON.parse(JSON.stringify(res));
        console.log('data Recap: ',data)

        this.recap_details=data[0];
        this.recap_details.StrenthOppurtunity.map((d) =>{
          console.log('data',d)
          if(d.type=='S'){
            if(d.period=='R'){
            this.strength_recap.push(d);
  
            }else{
                
            this.strength_lifetime.push(d);
            }
          }
          else if(d.type=='O'){
            if(d.period=='R'){
            this.oppurtunity_recap.push(d);
          }
          else{
  
            this.oppurtunity_lifetime.push(d);
          }
          }
          else{
  
          }
        })
        this.recap_details.TopicCompletion.map((d) =>{
          console.log('data',d)
          if(d.type=='G'){
            if(d.task_complete==1){
  
            this.completed_goal.push(d);
            }
            else{
              
            this.incompleted_goal.push(d);
            }
          }
          else if(d.type=='T'){
             if(d.task_complete==1){
            this.completed_task.push(d);
          }
          else{
            
            this.incompleted_task.push(d);
          }
          }
          else{
  
          }
        })

      })

  }
}