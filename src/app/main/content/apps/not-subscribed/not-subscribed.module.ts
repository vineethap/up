import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotSubscribedComponent } from './not-subscribed.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../routing_guard/auth.guard';

const routes: Routes = [
    {
        path     : ':name/noplan',
        component: NotSubscribedComponent,
          canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        NotSubscribedComponent
        
    ],
    providers   : [
        
        AuthGuard
    ]
})
export class NotSubscribedModule
{
}
