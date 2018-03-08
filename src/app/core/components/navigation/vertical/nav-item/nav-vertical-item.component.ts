import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotSubscribedComponent } from '../../../../../main/content/apps/not-subscribed/not-subscribed.component'
@Component({
  selector: 'fuse-nav-vertical-item',
  templateUrl: './nav-vertical-item.component.html',
  styleUrls: ['./nav-vertical-item.component.scss']
})

export class FuseNavVerticalItemComponent implements OnInit {
  @HostBinding('class') classes = 'nav-item';
  @Input() item: any;
  franchise_details: any = {};
  url: any;
  dialogRef: any;
  constructor(
    private franchise: FranchiseApi,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.url = localStorage.getItem('url');
    // console.log(userid);
    this.franchise.find({
      where: { company_new: this.url }
    }).subscribe((res) => {
      let x = sessionStorage.getItem('currentUser');
      this.franchise_details=JSON.parse(x);

    })
  }

  ngOnInit() {
   this.url= localStorage.getItem('url');
       // console.log(userid);
        this.franchise.find({
      where: { company_new: this.url }
    }).subscribe((res) => {
        this.franchise_details=res[0];
        
    }) 

  }
  goto(page) {
      let x = sessionStorage.getItem('currentUser');
      this.franchise_details=JSON.parse(x);
      console.log("here", page, this.franchise_details, this.url)
      console.log("\n page ="+ page + "," +  "url= " + this.url);
      if (this.franchise_details.payment_status == true) {
        this.router.navigate(['/' + this.url + '/' + page]);

      } else {
        this.dialogRef = this.dialog.open(NotSubscribedComponent, {
          panelClass: 'mail-compose-dialog',
          disableClose: true,
          hasBackdrop: true
        });
      }
  }
}
