import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { EditUserComponent } from './edit-user.component';


var usr = localStorage.getItem('url');

const routes: Routes = [{
  path: usr + '/user-management',
  component: EditUserComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxChartsModule,
    SharedModule
  ],
  declarations: [

    EditUserComponent
  ]
})
export class EditUserModule {}
