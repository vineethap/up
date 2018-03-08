import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseShortcutsDocsComponent } from './shortcuts/shortcuts.component';
import { FuseSearchBarDocsComponent } from 'app/main/content/components/search-bar/search-bar.component';
import { FuseWidgetDocsComponent } from './widget/widget.component';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

const routes = [
    {
        path     : 'components/search-bar',
        component: FuseSearchBarDocsComponent
    },
    {
        path     : 'components/shortcuts',
        component: FuseShortcutsDocsComponent
    },
    {
        path     : 'components/widget',
        component: FuseWidgetDocsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule
    ],
    declarations: [
        FuseSearchBarDocsComponent,
        FuseShortcutsDocsComponent,
        FuseWidgetDocsComponent
    ]
})
export class ComponentsModule
{
}
