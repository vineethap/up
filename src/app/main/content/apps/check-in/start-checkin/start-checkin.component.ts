import { Component, OnInit, Input, Output, EventEmitter, OnChanges,ElementRef, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MemberApi } from '../../../../../core/sdk/services/index';
import { CheckinApi } from '../../../../../core/sdk/services/index';
import { MatAutocompleteTrigger, MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-start-checkin',
  templateUrl: './start-checkin.component.html',
  styleUrls: ['./start-checkin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartCheckinComponent implements OnInit {
  @Input() employee: any;
  @Input() selected_type: any;
  @Input() topic_datas: any;
  @Input() topic_back: any;
  @Input() back_enable: any;
  @Input() informSelectedEmployee: any = [];
  nextbutton = false;
  nextbutton1 = false;
  employees: any[];
  employees1: any[];
  employee_id: any = {};
  employe_data: any = {};
  checkinStart: FormGroup;
  temp = [];
  employee_user_id = 0;
  back = false;
  multiSelectedEmp: any = [];
  multiSelectedEmp2: any = [];
  separatorKeysCodes = [ENTER];
  resetValue;
  @ViewChild("chip")
  public searchElementRef: ElementRef;
  //multiSelectedEmpId: any = [];
  arrayOfKeys: any;
  selectedEmployeeLength: any;
  empTextFiled: string;
  insertCheckinDetails: any;
  event_null : any
  thisObj: any = true;
  savedCheckinDetails: any;
  employeeFound: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private member: MemberApi,
    public checkinApi: CheckinApi,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.empTextFiled = "";
    this.employees=[];
    this.temp=[];
    if (this.informSelectedEmployee != undefined) {
      this.multiSelectedEmp = this.informSelectedEmployee;
    }

    if (this.employee != undefined) {
      this.multiSelectedEmp2 = this.employee.name;
    }

    var userId = localStorage.getItem('user_id');

    this.checkinStart = this.formBuilder.group({
      name: [this.employee ? this.employee.name : '', Validators.required],
      date: [this.employee ? this.employee.date : new Date(), Validators.required]

    });

    //employees listing who is still not recaped
    // this.checkinApi.find({
    //   include: {
    //     relation: "MemberCheckin",
    //     scope: {
    //       include: "Member",
    //       where:{
    //         recap_complete: 1
    //       }
    //     }
    //   },
    //   where: {
    //     created_by: userId,
    //     save_status: 1
    //   }
    // }).subscribe((res) => {

    //   console.log("res_member: ", res);
      
    //   if(res != undefined && res.length == 0){

    //     console.log("res.length : ", res.length);

    //     this.member.find({
    //       where: {
    //         "franchise_id": userId
    //       }
    
    //     }).subscribe((res) => {
    //       this.employees = res;
    //       this.temp = res;
    //     });
        
    //   }
 
    //   else if(res != undefined && res.length >= 1){
    //     var Data = JSON.parse(JSON.stringify(res));
    //     var nameArr = [];
    //     Data.forEach((item) => {
    //       if (item.MemberCheckin != undefined) {
    //         item.MemberCheckin.forEach((value) => {
    //           if (value.Member != undefined) {
    //             nameArr.push(value.Member);               
    //           }
    //         })
  
    //       }
    //     });
        
    //     this.employees = nameArr;
    //     console.log("employees: ", this.employees);
    //     this.temp = nameArr; 
    //   }
     
    // });
        this.member.find({
          where: {
            "franchise_id": userId
          },
          include:[{"relation":"MemberCheckin",scope:{
            include:[{"relation":"Checkin"}]
          }}]
        }).subscribe((res) => {
          var data=JSON.parse(JSON.stringify(res));
          data.map((mem)=>{

            this.employees.push(mem);
              this.temp.push(mem);
            
            /*if(mem.MemberCheckin.length>0){
                mem.MemberCheckin.map((che)=>{

                  if(che.recap_complete==1){
                    this.employees.push(mem);
                    this.temp.push(mem);
                  }
                  else{
                     this.employees=this.employees.filter((user)=>{
                        return mem.id!=user.id
                      })
                      this.temp=this.temp.filter((user)=>{
                        return mem.id!=user.id
                      })

                    if(che.Checkin.save_status==0){
                      this.employees.push(mem);
                      this.temp.push(mem);
                    }
                   
                  }
                })              
            }
            else{
              this.employees.push(mem);
              this.temp.push(mem);

            }*/



            // if(mem.hasOwnProperty('MemberCheckin')){
            //   if(mem.MemberCheckin.length==0){
            //     this.employees.push(mem);
            //     this.temp.push(mem);
              
            //   }
            // }
            // else{
            //   this.employees.push(mem);
            //   this.temp.push(mem);

            // }
          })
          console.log('dataaaaa',data,this.employees)
        });



    // Fetch Member
     /* this.member.find({
      where: {

        "franchise_id": userId
      }

    }).subscribe((res) => {
      this.employees = res;
      this.temp = res;
    });   */
  }

  

  createDetails(event) {
    this.empTextFiled = "";
    //if (this.selected_type.name == "Inform") {
    this.selectedEmployeeLength = this.multiSelectedEmp.length;

    console.log("created date: ", this.checkinStart.value.date);
    //if(this.selectedEmployeeLength == 1 ){

    this.employe_data = {
      name: this.multiSelectedEmp2,
      date: this.checkinStart.value.date,
      employee: this.multiSelectedEmp,
      selectedEmployeeLength: this.selectedEmployeeLength
    }


    this.insertCheckinDetails = {
       franchise_id : localStorage.getItem('franchise_id'),
       checkin_date : this.checkinStart.value.date,
       save_status : 0,
       created_by : localStorage.getItem("user_id"),
       created_by_role_id : localStorage.getItem("role_id")
    }

    console.log("insertCheckinDetails: ", this.insertCheckinDetails);

    this.nextbutton = !this.nextbutton;
    this.thisObj = false;
  }

  
  getSavedDetails(event){

    //console.log("checkin_date: ",this.checkinStart.value.date);
    //console.log("multiSelectedEmp2", this.multiSelectedEmp2);
    //console.log("this.multiSelectedEmp: ", this.multiSelectedEmp);
    //console.log("this.selectedEmployeeLength: ", this.selectedEmployeeLength);

    console.log("sselected date: ", this.checkinStart.value.date);
  
    var start_date=new Date(this.checkinStart.value.date);
    start_date.setHours(0,0,0,0);
    var end_date=new Date(this.checkinStart.value.date);
    end_date.setHours(23,59,59,999)
    console.log("str",start_date)
    console.log("str",end_date)


    this.employe_data = {
        name: this.multiSelectedEmp2,
        date: this.checkinStart.value.date,
        employee: this.multiSelectedEmp,
        selectedEmployeeLength: this.selectedEmployeeLength
    }

    console.log("id:" , this.multiSelectedEmp[0].id);
    //console.log("dateString: ", dateString);

    this.checkinApi.find({
      where:{
        "checkin_date":{ between:[start_date,end_date] },
         "save_status" : 0
    
      },
      include: [
        {
          relation:"MemberCheckin",
          scope:{
          where:{
            member_id :this.multiSelectedEmp[0].id
          }
        }
      },
        {
          relation: "MemberCheckinType",
          scope:{
            include:["CheckInType",
            {
              relation:"MemberCheckinTopic",
              scope:{
                include:"Topic"
              }
            }]
          }
        }]
        ,
        //order: 'date DESC'
        order: 'checkin_date DESC',
        //limit: 1
      //order: 'date DESC'
      
    }).subscribe((res) => {
        console.log("bbb",res);

        var resjson = JSON.parse(JSON.stringify(res));
        for (var  i = 0; i < resjson.length ; i++){
          if(resjson[i].MemberCheckin.length > 0 ){

            console.log("if")
            this.employeeFound = true;
            this.savedCheckinDetails  = resjson[i];
            this.nextbutton1 = true;
            this.thisObj = false;
            break;
          }
          else{
            this.employeeFound = false;
          }

        }
        console.log("savedCheckinDetails: ", this.savedCheckinDetails); 

        if(this.employeeFound == false){
          
          this.snackBar.open('No saved check-in entries for this date!', '', {
                        duration: 2000
          });
        }

        console.log("nextbutton1:", this.nextbutton1);

        /*if(res == undefined){

          this.snackBar.open('No saved check-in entries for this date', '', {
            duration: 2000
          });
  
        }
        

        else{

          var resjson = JSON.parse(JSON.stringify(res));
          console.log("resjson:", resjson);
          this.employeeFound = true;
          this.savedCheckinDetails  = resjson[0];
          this.nextbutton1 = !this.nextbutton1;
          this.thisObj = false;

          /* for (var  i = 0; i < resjson.length ; i++){
            // console.log("data: ", resjson[i].MemberCheckin);

             for(var j=0; j < resjson[i].MemberCheckin.length; j++){
                 console.log("membid: ", resjson[i].MemberCheckin[j].member_id);
                 //console.log("index:", empId.indexOf(resjson[i].MemberCheckin[j].member_id));
                 if((this.multiSelectedEmp[0].id) == resjson[i].MemberCheckin[j].member_id){
                   console.log("employee id  equals...");
                   this.employeeFound = true;
                   this.savedCheckinDetails  = resjson[i];
                   this.nextbutton1 = !this.nextbutton1;
                   this.thisObj = false;
                   //break;
                 }
                 /* else{
                  
                  this.employeeFound = false;
                 }  
             }
          }
           if(this.employeeFound == false){

            this.snackBar.open('No saved check-in entries for this employee', '', {
              duration: 2000
            });

           this.savedCheckinDetails  = resjson;
            this.nextbutton1 = !this.nextbutton1;
            this.thisObj = false; 

          } 

          else{
            this.snackBar.open('No saved check-in entries for this employee', '', {
              duration: 2000
            });
          } 
          //console.log("savedCheckinDetails: ", this.savedCheckinDetails): 
        }*/
      }) 
  }

  updateFilter(event) {
    this.empTextFiled = "";
    console.log("val: ", event.target.value);
    this.event_null = event.target.value;
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
    console.log("update filter....");
  }

  getEmployeeId(id) {
    this.empTextFiled = "";
    this.employee_user_id = id;
    //console.log("employee_user_id_getEmployeeId: ", this.employee_user_id);
    //console.log"("name: ", name);
    // this.multiSelectedEmp = "";
    // this.multiSelectedEmp += name + ", ";
    // console.log("multiSelectedEmp: ", this.multiSelectedEmp); 
  }

  addSelected(event, chip) {
    chip = "";
    this.searchElementRef.nativeElement.value = chip;
    this.empTextFiled = null
    this.checkinStart.value.name = "";
    if ((event.option.value[0] || '').trim()) {


      this.multiSelectedEmp = this.multiSelectedEmp.filter((d: any) => {
        if (d.name != event.option.value[0].trim()) {
          return d
        }

      })
      this.multiSelectedEmp2 = this.multiSelectedEmp2.filter((d: any) => {
        if (d != event.option.value[0].trim()) {
          return d
        }

      })

      this.multiSelectedEmp2.push(event.option.value[0]);
      this.multiSelectedEmp.push({
        name: event.option.value[0],
        id: event.option.value[1]
      });
      //this.multiSelectedEmpId.push(event.option.value[1]);
    }
    
    //this.arrayOfKeys = Object.keys(this.multiSelectedEmp);
    //console.log("arrayOfKeys: ", this.arrayOfKeys);
    // Reset the input value

    console.log("Add selected...");
    //Reset the input value
    /*  if (event.input) {
       event.input.value[0] = '';
     } */
    // this.resetValue = "";
     //console.log ("event", event.option.value[0]);
     event.option.value[0] = "";
     //console.log ("event", event.option.value[0]);
     console.log ("event_null", this.event_null);
     this.event_null = "effefe";
     console.log ("event_null", this.event_null);
     console.log("empTextFiled: ", this.empTextFiled);
     this.empTextFiled = "";
  }

  remove(selected: any): void {
    this.empTextFiled = "";
    console.log("selected: ", selected);

    //empIdArr
    let index = this.multiSelectedEmp.indexOf(selected);
    let index2 = this.multiSelectedEmp2.indexOf(selected.name);
    console.log("vvvvvvvv", index2)
    if (index >= 0) {
      this.multiSelectedEmp.splice(index, 1);
    }
    if (index2 >= 0) {
      this.multiSelectedEmp2.splice(index, 1);
    }
    // this.chipInput['nativeElement'].blur();
  }


}
