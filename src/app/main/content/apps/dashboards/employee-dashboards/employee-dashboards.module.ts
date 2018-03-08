import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardsComponent } from './employee-dashboards.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : ':name/employee-dashboards',
        component: EmployeeDashboardsComponent
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
        EmployeeDashboardsComponent
    ]
})
export class EmployeeDashboardsModule
{
}

