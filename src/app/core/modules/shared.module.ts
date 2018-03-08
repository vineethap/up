import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ColorPickerModule } from 'ngx-color-picker';
// import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '../directives/mat-sidenav-helper/mat-sidenav-helper.directive';
import { FusePipesModule } from '../pipes/pipes.module';
import { FuseConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FuseCountdownComponent } from '../components/countdown/countdown.component';
import { FuseMatchMedia } from '../services/match-media.service';
import { FuseNavbarVerticalService } from '../../main/navbar/vertical/navbar-vertical.service';
import { FuseMatSidenavHelperService } from '../directives/mat-sidenav-helper/mat-sidenav-helper.service';
import { FuseHljsComponent } from '../components/hljs/hljs.component';
import { FusePerfectScrollbarDirective } from '../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseIfOnDomDirective } from '../directives/fuse-if-on-dom/fuse-if-on-dom.directive';
// import { FuseMaterialColorPickerComponent } from '../components/material-color-picker/material-color-picker.component';
import { CookieService } from 'ngx-cookie-service';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
    declarations   : [
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FuseConfirmDialogComponent,
        FuseCountdownComponent,
        FuseHljsComponent,
        FuseIfOnDomDirective,
        FusePerfectScrollbarDirective
        // FuseMaterialColorPickerComponent
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FusePipesModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        // NgxDnDModule,
        NgxDatatableModule,
        NgPipesModule
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePipesModule,
        FuseCountdownComponent,
        FuseHljsComponent,
        FusePerfectScrollbarDirective,
        ReactiveFormsModule,
        // ColorPickerModule,
        // NgxDnDModule,
        NgxDatatableModule,
        FuseIfOnDomDirective,
        // FuseMaterialColorPickerComponent
        NgPipesModule
    ],
    entryComponents: [
        FuseConfirmDialogComponent
    ],
    providers      : [
        CookieService,
        FuseMatchMedia,
        FuseNavbarVerticalService,
        FuseMatSidenavHelperService
    ]
})

export class SharedModule
{

}