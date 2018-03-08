/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { UserApi } from './services/custom/User';
import { MemberApi } from './services/custom/Member';
import { SubscriptionApi } from './services/custom/Subscription';
import { FranchiseApi } from './services/custom/Franchise';
import { EmailApi } from './services/custom/Email';
import { ContainerApi } from './services/custom/Container';
import { StoreApi } from './services/custom/Store';
import { ScaleApi } from './services/custom/Scale';
import { PIPApi } from './services/custom/PIP';
import { TopicApi } from './services/custom/Topic';
import { StoreHistoryApi } from './services/custom/StoreHistory';
import { FollowUpApi } from './services/custom/FollowUp';
import { CheckinApi } from './services/custom/Checkin';
import { RecapApi } from './services/custom/Recap';
import { MemberProfileApi } from './services/custom/MemberProfile';
import { IndustryApi } from './services/custom/Industry';
import { MultipleUsersTempApi } from './services/custom/MultipleUsersTemp';
import { LocationTempApi } from './services/custom/LocationTemp';
import { PaymentDetailsApi } from './services/custom/PaymentDetails';
import { UserCardsApi } from './services/custom/UserCards';
import { TopicTypeApi } from './services/custom/TopicType';
import { RatingSetupApi } from './services/custom/RatingSetup';
import { NotificationApi } from './services/custom/Notification';
import { CheckInTypeApi } from './services/custom/CheckInType';
import { RolesApi } from './services/custom/Roles';
import { PermissionApi } from './services/custom/Permission';
import { ModuleApi } from './services/custom/Module';
import { RolemappingApi } from './services/custom/Rolemapping';
import { SaveAsTempApi } from './services/custom/SaveAsTemp';
import { MemberCheckinTypeApi } from './services/custom/MemberCheckinType';
import { MemberCheckinApi } from './services/custom/MemberCheckin';
import { MemberCheckinTopicApi } from './services/custom/MemberCheckinTopic';
import { RecapStrenthOpportunityApi } from './services/custom/RecapStrenthOpportunity';
import { RecapTopicCompletionApi } from './services/custom/RecapTopicCompletion';
import { TrainingVideosApi } from './services/custom/TrainingVideos';
import { PulseSurveyApi } from './services/custom/PulseSurvey';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        UserApi,
        MemberApi,
        SubscriptionApi,
        FranchiseApi,
        EmailApi,
        ContainerApi,
        StoreApi,
        ScaleApi,
        PIPApi,
        TopicApi,
        StoreHistoryApi,
        FollowUpApi,
        CheckinApi,
        RecapApi,
        MemberProfileApi,
        IndustryApi,
        MultipleUsersTempApi,
        LocationTempApi,
        PaymentDetailsApi,
        UserCardsApi,
        TopicTypeApi,
        RatingSetupApi,
        NotificationApi,
        CheckInTypeApi,
        RolesApi,
        PermissionApi,
        ModuleApi,
        RolemappingApi,
        SaveAsTempApi,
        MemberCheckinTypeApi,
        MemberCheckinApi,
        MemberCheckinTopicApi,
        RecapStrenthOpportunityApi,
        RecapTopicCompletionApi,
        TrainingVideosApi,
        PulseSurveyApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
