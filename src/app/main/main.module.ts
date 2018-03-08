import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';

import { NotSubscribedModule } from './content/apps/not-subscribed/not-subscribed.module';
import { UserManagementModule } from './content/apps/user-management/user-management.module';
import { StoreManagementModule } from './content/apps/store-management/store-management.module';
import { SubscriptionManagementModule } from './content/apps/subscription-management/subscription-management.module';
import { ManagerDashboardsModule } from './content/apps/dashboards/manager-dashboards/manager-dashboards.module';
import { PreviewModule } from './content/apps/preview/preview.module';
import { BillingHistoryModule } from './content/apps/billing-history/billing-history.module';
import { CheckInModule } from './content/apps/check-in/check-in.module';
import { EmployeeDashboardsModule } from './content/apps/dashboards/employee-dashboards/employee-dashboards.module';
import { TopicModule } from './content/apps/topic/topic.module';
import { ProfileSettingsModule } from './content/apps/profile-settings/profile-settings.module';
import { ChangePasswordModule } from './content/apps/change-password/change-password.module';
import { FollowupModule } from './content/apps/followup/followup.module';
import { SampleStripeModule } from './content/apps/sample-stripe/sample-stripe.module';
import { SupervisorDashboardsModule } from './content/apps/dashboards/supervisor-dashboards/supervisor-dashboards.module';
import { DirectorDashboardsModule } from './content/apps/dashboards/director-dashboards/director-dashboards.module';
import { RecapModule } from './content/apps/recap/recap.module';
// import { CheckinRecordComponent } from './content/apps/checkin-record/checkin-record.component';
import { CheckinRecordModule } from './content/apps/checkin-record/checkin-record.module';
import { RecapRecordModule } from './content/apps/recap-record/recap-record.module';
import { RecapListModule } from './content/apps/recap-list/recap-list.module';
import { RecapModuleNew } from './content/apps/recap-new/recap-new.module';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseQuickPanelComponent
        

        
        
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        UserManagementModule,
        NotSubscribedModule,
        StoreManagementModule,
        SubscriptionManagementModule,
        PreviewModule,
        ManagerDashboardsModule,
        BillingHistoryModule,
        CheckInModule,
        EmployeeDashboardsModule,
        TopicModule,
        ProfileSettingsModule,
        ChangePasswordModule,
        FollowupModule,
        SampleStripeModule,
        SupervisorDashboardsModule,
        DirectorDashboardsModule,
        RecapModule,
        CheckinRecordModule,
        RecapRecordModule,
        RecapListModule,
        RecapModuleNew
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule {}
