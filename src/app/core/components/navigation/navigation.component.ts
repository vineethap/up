import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FuseNavigationService } from './navigation.service';
import { Subscription } from 'rxjs/Subscription';

/* import { MemberApi } from './core/sdk/services/custom/Member';
import { Member } from './core/sdk/models/Member';  */


@Component({
    selector     : 'fuse-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';

    constructor(private fuseNavigationService: FuseNavigationService)
    {
        this.navigationModelChangeSubscription =
            this.fuseNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    //console.log('GGGGGGGG',navigationModel)
                    //console.log("local storage:", localStorage);
                    //this.navigationModel = navigationModel;
                    //console.log("navigation_model: ", navigationModel);
                    if(localStorage.getItem("role_type") == "EX"){
                        this.navigationModel = navigationModel["franchise"];
                    }
                    else if(localStorage.getItem("role_type") == "D"){
                        this.navigationModel  = navigationModel["director"];
                    }
                    else if(localStorage.getItem("role_type") == "M"){
                        this.navigationModel  = navigationModel["manager"];
                    }
                    else if(localStorage.getItem("role_type") == "S"){
                        this.navigationModel  = navigationModel["supervisor"];
                    }
                    else if(localStorage.getItem("role_type") == "EM"){
                        this.navigationModel  = navigationModel["employee"];
                    }
                });
    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
