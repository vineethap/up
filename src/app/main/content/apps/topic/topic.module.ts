import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicComponent } from './topic.component';
import { SharedModule } from '../../../../core/modules/shared.module';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { DeletetopicComponent } from './deletetopic/deletetopic.component';
import { EdittopicComponent } from './edittopic/edittopic.component'; 
import { AuthGuard } from '../../../routing_guard/auth.guard';

const routes: Routes = [
    {
        path     : ':name/topic',
        component: TopicComponent
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        // NgxChartsModule,
        SharedModule
    ],
    declarations: [
        TopicComponent ,
        AddtopicComponent,
        DeletetopicComponent,
        EdittopicComponent 
        
    ] ,
  providers: [
    AuthGuard
  ],
    entryComponents: [AddtopicComponent,DeletetopicComponent,EdittopicComponent]
     
})
export class TopicModule
{
}

