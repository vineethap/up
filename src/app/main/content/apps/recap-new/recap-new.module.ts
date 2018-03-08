import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecapComponentNew } from './recap-new.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../routing_guard/auth.guard';
import { DatePipe } from '@angular/common';
// import { EmpSelectionComponent } from './emp-selection/emp-selection.component';
// import { DetailViewComponent } from './detail-view/detail-view.component';
// import { ChooseElementsComponent } from './choose-elements/choose-elements.component';

const routes: Routes = [
    {
        path     : ':name/recap',
        component: RecapComponentNew,
          canActivate: [AuthGuard]
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        RecapComponentNew,
        // EmpSelectionComponent,
        // DetailViewComponent,
        // ChooseElementsComponent
    
    ],
    providers   : [
        
        AuthGuard,
        DatePipe
    ],
     entryComponents: []
})
export class RecapModuleNew
{
}