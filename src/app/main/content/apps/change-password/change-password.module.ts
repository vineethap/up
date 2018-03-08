import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes: Routes = [{
  path: ':name/change-password',
  component: ChangePasswordComponent

}];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)

  ],
  declarations: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule {}
