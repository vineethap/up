import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './check-in.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { StartCheckinComponent } from './start-checkin/start-checkin.component';
import { SelectTopicComponent } from './select-topic/select-topic.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { TopicRatingComponent } from './confirmation-page/topic-rating/topic-rating.component';
import { DatePipe } from '@angular/common';
import { CheckInSummaryComponent } from './check-in-summary/check-in-summary.component';
import { SelectCheckintypeComponent } from './select-checkintype/select-checkintype.component';
import { SavedConfirmationPageComponent } from './confirmation-page/saved-confirmation-page/saved-confirmation-page.component';
const routes: Routes = [
    {
        path     : ':name/check-in',
        component: CheckInComponent,
          canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        CheckInComponent,
        StartCheckinComponent,
        SelectTopicComponent,
        ConfirmationPageComponent,
        TopicRatingComponent,
        CheckInSummaryComponent,
        SelectCheckintypeComponent,
        SavedConfirmationPageComponent
    
    ],
    providers   : [
        
        AuthGuard,
        DatePipe
    ],
     entryComponents: [StartCheckinComponent,SelectTopicComponent
    ]
})
export class CheckInModule
{
}