import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { CheckInTypeApi, TrainingVideosApi } from '../../../../../core/sdk/services/index';
import { MatSnackBar } from '@angular/material';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-select-checkintype',
  templateUrl: './select-checkintype.component.html',
  styleUrls: ['./select-checkintype.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckintypeComponent implements OnInit {
  @Input() selected_type: any;
  @Input() topic_back: any;
  @Input() employee: any;
  @Input() back_enable: any;
  @Input() informSelectedEmployee: any = [];
  @Input() insertCheckinDetails: any;
  @Input() selectedCheckinTypes : any;

  nextbutton = false;
  type: any;
  checkin_name: any;
  selected_item: any = {};
  type_details1: any[];
  type_details2: any[];
  back = false;
  employeeLength: any;
  selectedEmployee: any;
  checkinTypeSelection : {} ={};
  selectedCheckinType: any = [];
  checkinTypeSelectNumber = true;
  select: any = [];
  selectedCheckinTypeTemp : any;
  baseUrl_type_logo:any;
  videoShownFlag: any = false;
  videoEmbeddedUrl: any;

  constructor(
    private checkinTypeApi: CheckInTypeApi,
    public snackBar: MatSnackBar,
    private trainingVideosApi : TrainingVideosApi,
    public sanitizer:DomSanitizer,
    private route: ActivatedRoute,
    private router: Router, public location: Location
  ) {}

  ngOnInit() {
    this.baseUrl_type_logo="../../assets/images/check-in/";
    if(this.selectedCheckinTypes != undefined){
      this.selectedCheckinType = this.selectedCheckinTypes;
      console.log("select: ", this.selectedCheckinType);
      console.log("select len: ", this.selectedCheckinType.length)
      if( this.selectedCheckinType.length == 1){
        this.checkinTypeSelectNumber = false;
      }
      else if (this.selectedCheckinType.length == 2){
        this.checkinTypeSelectNumber = false;
      }
      
      this.selectedCheckinType.map((_item: any) => {
        this.checkinTypeSelection[_item.id] = true;
      });

    }

    /* if (this.selectedCheckinType != undefined) {
      
      
    } */ 

    /* if (this.selected_type != undefined) {
      this.type = this.selected_type ? this.selected_type.type : '';
      this.checkin_name = this.selected_type ? this.selected_type.name : '';
    } */

    this.employeeLength = this.employee.selectedEmployeeLength;
    this.selectedEmployee = this.employee.name;


    this.checkinTypeApi.find().subscribe((res) => {
      this.type_details1 = [res[0], res[1], res[2]];
      this.type_details2 = [res[3], res[4], res[5]];
    });

    if(this.insertCheckinDetails != undefined){
      this.insertCheckinDetails = this.insertCheckinDetails;
    }

    if(this.informSelectedEmployee != undefined){
      this.informSelectedEmployee = this.informSelectedEmployee;
    }
  }

  selectCheckinType() {

    //this.selectedCheckinType = this.selectedCheckinType;
    /* console.log("checkinTypeSelectNumber: ", this.checkinTypeSelectNumber);
    console.log("selectCheckinType: ", this.selectCheckinType);
    console.log("selectCheckinType_len: ", this.selectCheckinType.length); */
    this.nextbutton = true; 

  }

  getCheckinTypeName(type) {

    //var selected = this.selected_type.type;
    console.log("select: ", this.checkinTypeSelection[type.id]); 
    if (this.checkinTypeSelection[type.id] == true) {
      
      /* if(this.selectedCheckinType.length == 2 || this.selectCheckinType.length == 1){
        this.checkinTypeSelectNumber = false;
      } */

      this.selectedCheckinType.push({ name: type.checkin_name, id: type.id ,class:type.class});
      console.log("selectedCheckinType: ", this.selectedCheckinType)
  
      if(this.selectedCheckinType.length > 2){
        console.log("111")
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.checkinTypeSelectNumber = true;
      } 

      else if(this.selectedCheckinType.length < 1){
           console.log("222")
        this.snackBar.open('Select minimum 1', '', {
          duration: 2000
        });
        this.checkinTypeSelectNumber = true;
      }
      else{
           console.log("333")
        this.checkinTypeSelectNumber = false;
      }
    }
    else{

      /* if(this.selectedCheckinType.length == 2 || this.selectCheckinType.length == 1){
        this.checkinTypeSelectNumber = false;
      } */
     
      console.log("this.checkinTypeSelectNumber:", this.checkinTypeSelectNumber); 
  
      this.selectedCheckinType.map((item:any,index:any)=>{
        if (type.id == item.id) {
          this.selectedCheckinType.splice(index, 1);
        }
      })

      if(this.selectedCheckinType.length > 2){
        this.snackBar.open('You can select up to 2 max', '', {
          duration: 2000
        });
        this.checkinTypeSelectNumber = true;
      } 
      else if(this.selectedCheckinType.length < 1){
        this.snackBar.open('Select minimum 1', '', {
          duration: 2000
        });
        this.checkinTypeSelectNumber = true;
      }

      else{
        this.checkinTypeSelectNumber = false;
      }
    };
    //setting select checkin
    this.checkin_name = type.checkin_name;

  }

  backClicked() {
    this.back = true;
    console.log("nextbutton: ", this.nextbutton);
  }

  getEmbeddedVideos(){

    this.videoShownFlag = true;
    console.log("videoShownFlag: ", this.videoShownFlag);

    this.trainingVideosApi.find().subscribe(
        (res) => {
          var resjson = JSON.parse(JSON.stringify(res));
          console.log("res: ", resjson[0].url);
          
          const link = document.createElement('a');
          link.target = '_blank';
          link.href = resjson[0].url;
          link.setAttribute('visibility', 'hidden');
          link.click();
          
          //window.open('https://www.youtube.com/embed/kr9dkp3NLN4');
         
          //this.videoEmbeddedUrl =  "https://www.youtube.com/embed/kr9dkp3NLN4";

          /*this.videoEmbeddedUrl = 
              this.sanitizer.bypassSecurityTrustResourceUrl(resjson[0].url);  */
              //console
          /* this.snackBar.open('Created Videos ;List!', '', {
            duration: 2000
          }); */
          //this.dialogRef.close(res);

        }, /* (error) => {
          this.snackBar.open(' Wrong Videos !', '', {
            duration: 2000
          });
        } */); 
    //return "The link is: <a href = https://www.youtube.com/embed/kr9dkp3NLN4>Google</a>";

  }
  closeEmbeddedVideos(){
    this.videoShownFlag = false;
  }
}
