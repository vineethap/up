import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecapRecordComponent } from './recap-record.component';
import { RecapRecordDetailComponent } from './recap-record-details/recap-record-details.component';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    {
        path     : ':name/recap-record',
        component: RecapRecordComponent,
        canActivate: [AuthGuard]
        
    },{
        path     : ':name/recap-record/:id',
        component: RecapRecordDetailComponent,
        canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),SharedModule
       
    ],
    declarations: [
       RecapRecordComponent,
       RecapRecordDetailComponent
    ],
    providers   : [
        
        AuthGuard    ],
     entryComponents: [
    ]
})
export class RecapRecordModule
{
}