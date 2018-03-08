import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecapListComponent } from './recap-list.component';
import { RecapListDetailComponent } from './recap-list-details/recap-list-details.component';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    {
        path     : ':name/recap-list',
        component: RecapListComponent,
        canActivate: [AuthGuard]
        
    },{
        path     : ':name/recap-list/:id',
        component: RecapListDetailComponent,
        canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),SharedModule
    ],
    declarations: [
       RecapListComponent,
       RecapListDetailComponent
    ],
    providers   : [
        
        AuthGuard    ],
     entryComponents: [
    ]
})
export class RecapListModule
{
}