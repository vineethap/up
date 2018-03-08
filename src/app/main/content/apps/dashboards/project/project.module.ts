import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseProjectComponent } from './project.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { ProjectsDashboardService } from './projects.service';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthGuard } from '../../../../routing_guard/auth.guard';
import { DatePipe } from '@angular/common';

const routes: Routes = [
    {
        path     : ':name/dashboards',
        component: FuseProjectComponent,
        resolve  : {
            data: ProjectsDashboardService
        },
         canActivate: [AuthGuard]
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
        FuseProjectComponent
    ],
    providers   : [
        ProjectsDashboardService
    ]
})
export class ProjectModule
{
}

