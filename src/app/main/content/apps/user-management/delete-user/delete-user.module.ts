import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { DeleteUserComponent } from './delete-user.component';

const routes: Routes = [{
  path: 'admin/addfranchise',
  component: DeleteUserComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxChartsModule,
    SharedModule
  ],
  declarations: [

    DeleteUserComponent
  ]
})
export class DeleteUserModule {}
