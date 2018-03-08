import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../core/modules/shared.module';
import { AuthGuard } from '../../../routing_guard/auth.guard';

import { BillingHistoryComponent } from './billing-history.component';

const routes = [
    {
        path     : ':name/billing',
        component: BillingHistoryComponent,
                canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        BillingHistoryComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        BillingHistoryComponent
    ]
    // ,providers:[AuthGuard]
})

export class BillingHistoryModule
{
}
