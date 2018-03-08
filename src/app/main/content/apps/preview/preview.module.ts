import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PreviewEditComponent } from './preview-edit/preview-edit.component';
import { PreviewDeleteComponent } from './preview-delete/preview-delete.component';
const routes: Routes = [
    {
        path     : ':name/preview',
        component: PreviewComponent
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
       
    ],
    declarations: [
        PreviewComponent,
        PreviewEditComponent,
        PreviewDeleteComponent
    ],
     entryComponents: [PreviewDeleteComponent,PreviewEditComponent]
})
export class PreviewModule
{
}
