import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorDashboardsComponent } from './director-dashboards.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : ':name/director-dashboards',
        component: DirectorDashboardsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule
        // NgxChartsModule
    ],
    declarations: [
        DirectorDashboardsComponent
    ]
})
export class DirectorDashboardsModule
{
}

