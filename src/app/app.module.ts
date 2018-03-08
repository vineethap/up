import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { ProjectModule } from './main/content/apps/dashboards/project/project.module';

import { FuseSampleModule } from './main/content/sample/sample.module';
import { PagesModule } from './main/content/pages/pages.module';
import { SDKBrowserModule } from './core/sdk/index'; 

import { AgmCoreModule } from '@agm/core';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { Auth } from './main/routing_guard/auth.service';


const appRoutes: Routes = [
   
 {
        path      : '**',
        redirectTo: 'register'
    }
    ];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBN0FRtlRcm9__U_ww5PD5dIPz2o5B5CBM",
            libraries: ["places"]
          }),
        InlineEditorModule,
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // RouterModule.forRoot(appRoutes),
         RouterModule.forRoot(appRoutes, { useHash: true }),
        SharedModule,
        FuseMainModule,
        FuseSampleModule,
        ProjectModule,
  SDKBrowserModule.forRoot(),
        PagesModule

    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,Auth
    ],
    bootstrap   : [
        AppComponent
    ],
    
})
export class AppModule
{
}
