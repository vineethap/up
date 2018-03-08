import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecapComponent } from './recap.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { DatePipe } from '@angular/common';
import { EmpSelectionComponent } from './emp-selection/emp-selection.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ChooseElementsComponent } from './choose-elements/choose-elements.component';
import { RecapConfirmationPageComponent } from './recap-confirmation-page/recap-confirmation-page.component';



const routes: Routes = [
    {
        path     : ':name/recap-new',
        component: RecapComponent,
          canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        RecapComponent,
        EmpSelectionComponent,
        DetailViewComponent,
        ChooseElementsComponent,
        RecapConfirmationPageComponent
    
    ],
    providers   : [
        
        AuthGuard,
        DatePipe
    ],
     entryComponents: [EmpSelectionComponent]
})
export class RecapModule
{
}