import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorDashboardsComponent } from './supervisor-dashboards.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : ':name/supervisor-dashboards',
        component: SupervisorDashboardsComponent
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
        SupervisorDashboardsComponent
    ]
})
export class SupervisorDashboardsModule
{
}

