import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes: Routes = [{
  path: ':name/profile-settings',
  component: ProfileSettingsComponent

}];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)

  ],
  declarations: [
    ProfileSettingsComponent
  ]
})
export class ProfileSettingsModule {}
