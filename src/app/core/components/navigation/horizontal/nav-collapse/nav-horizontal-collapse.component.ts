import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { fuseAnimations } from '../../../../animations';
import { FuseConfigService } from '../../../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { FranchiseApi } from '../../../../../core/sdk/services/index';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotSubscribedComponent } from '../../../../../main/content/apps/not-subscribed/not-subscribed.component'


@Component({
    selector   : 'fuse-nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : fuseAnimations
})
export class FuseNavHorizontalCollapseComponent implements OnDestroy
{
    onSettingsChanged: Subscription;
    fuseSettings: any;
    isOpen = false;
    franchise_details: any = {};
    url: any;
    dialogRef: any;

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private fuseConfig: FuseConfigService,
        private franchiseApi : FranchiseApi,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        //console.log("this.fuseSettings.item: ", this.fuseSettings.layout);
                    }
                );

                this.url = localStorage.getItem('url');
                // console.log(userid);
                this.franchiseApi.find({
                  where: { company_new: this.url }
                }).subscribe((res) => {
                  let x = sessionStorage.getItem('currentUser');
                  this.franchise_details=JSON.parse(x);
            
                })
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }

    ngOnInit() {
        this.url= localStorage.getItem('url');
            // console.log(userid);
             this.franchiseApi.find({
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
