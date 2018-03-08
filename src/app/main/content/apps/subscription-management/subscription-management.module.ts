import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionManagementComponent } from './subscription-management.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../routing_guard/auth.guard';

const routes: Routes = [
    {
        path     : ':name/subscription-management',
        component: SubscriptionManagementComponent
        
    }, {
        path     : ':name/subscription-management/:users',
        component: SubscriptionManagementComponent
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        SubscriptionManagementComponent
    ]
})
export class SubscriptionManagementModule
{
}
