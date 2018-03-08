import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { NotfoundComponent } from './notfound.component';

const routes = [
    {
        path     : '404',
        component: NotfoundComponent
    }
];

@NgModule({
    declarations: [
        NotfoundComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
    // ,
    // providers:[
    // AuthGuard
    // ]
})

export class NotfoundModule
{

}
