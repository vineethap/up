import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../../../core/modules/shared.module';
import { StoreManagementComponent } from './store-management.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { DeleteStoreComponent } from './delete-store/delete-store.component';
import { AuthGuard } from '../../../routing_guard/auth.guard';

var usr = localStorage.getItem('url')
//console.log("url_store: ", usr);
const routes: Routes = [{
  path: ':name/store-management',
  component: StoreManagementComponent,
                canActivate: [AuthGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // NgxChartsModule,
    SharedModule
  ],
  declarations: [
    StoreManagementComponent,
    AddStoreComponent,
    EditStoreComponent,
    DeleteStoreComponent
  ],
  providers:[AuthGuard],
  entryComponents: [AddStoreComponent,EditStoreComponent,DeleteStoreComponent]
})
export class StoreManagementModule {}
