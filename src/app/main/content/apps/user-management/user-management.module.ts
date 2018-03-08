import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../../../core/modules/shared.module';
import { UserManagementComponent } from './user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EmailExistsComponent } from './email-exists/email-exists.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { AuthGuard } from '../../../routing_guard/auth.guard';
var usr = localStorage.getItem('url')
const routes: Routes = [{
  path: ':name/user-management',
  component: UserManagementComponent ,canActivate: [AuthGuard]

}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxChartsModule,
    SharedModule,
    InlineEditorModule
  ],
  declarations: [

    UserManagementComponent,

    AddUserComponent,

    EditUserComponent,

    DeleteUserComponent,

    EmailExistsComponent

    
  ],
  entryComponents: [AddUserComponent,EditUserComponent,DeleteUserComponent,EmailExistsComponent]
})
export class UserManagementModule {}
