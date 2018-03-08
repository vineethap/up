import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../routing_guard/auth.guard';

import { FuseSurveyComponent } from './survey.component';

const routes = [
    {
        path     : 'survey/:id',
        component: FuseSurveyComponent
    }
];

@NgModule({
    declarations: [
        FuseSurveyComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class SurveyModule
{

}
