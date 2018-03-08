import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardsComponent } from './manager-dashboards.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : ':name/manager-dashboards',
        component: ManagerDashboardsComponent
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
        ManagerDashboardsComponent
    ]
})
export class ManagerDashboardsModule
{
}

