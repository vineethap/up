import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../routing_guard/auth.guard';

import { FuseLoginComponent } from './login.component';

const routes = [
    {
        path     : ':name/login',
        component: FuseLoginComponent
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class LoginModule
{

}
