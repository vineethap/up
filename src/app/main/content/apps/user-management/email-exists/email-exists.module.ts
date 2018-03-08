import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { EmailExistsComponent } from './email-exists.component';


var usr = localStorage.getItem('url');

const routes: Routes = [{
  path: usr + '/user-management',
  component: EmailExistsComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxChartsModule,
    SharedModule
  ],
  declarations: [

    EmailExistsComponent
  ]
})
export class EditUserModule {}
