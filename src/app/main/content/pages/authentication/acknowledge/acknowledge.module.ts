import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../routing_guard/auth.guard';

import { AcknowledgeComponent } from './acknowledge.component';

const routes = [
    {
        path     : 'acknowledge/:id',
        component: AcknowledgeComponent
    }
];

@NgModule({
    declarations: [
        AcknowledgeComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class AcknowledgeModule
{

}
