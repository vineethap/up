import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleStripeComponent } from './sample-stripe.component';
import { SharedModule } from '../../../../core/modules/shared.module';
const routes: Routes = [
    {
        path     : ':name/sample-stripe',
        component: SampleStripeComponent
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        SampleStripeComponent
    ]
     
})
export class SampleStripeModule
{
}
