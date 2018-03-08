import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinRecordComponent } from './checkin-record.component';
import { CheckinRecordDetailComponent } from './checkin-record-details/checkin-record-details.component';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    {
        path     : ':name/check-record',
        component: CheckinRecordComponent,
        canActivate: [AuthGuard]
        
    },{
        path     : ':name/check-record/:id',
        component: CheckinRecordDetailComponent,
        canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),SharedModule
       
    ],
    declarations: [
       CheckinRecordComponent,
       CheckinRecordDetailComponent 
    ],
    providers   : [
        
        AuthGuard    ],
     entryComponents: [
    ]
})
export class CheckinRecordModule
{
}