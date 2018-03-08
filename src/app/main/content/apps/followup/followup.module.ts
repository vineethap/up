import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowupComponent } from './followup.component';
import { SharedModule } from '../../../../core/modules/shared.module';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes: Routes = [{
  path: ':name/followup',
  component: FollowupComponent

}];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)

  ],
  declarations: [
    FollowupComponent
  ],
  entryComponents: [FollowupComponent]
})
export class FollowupModule {}
