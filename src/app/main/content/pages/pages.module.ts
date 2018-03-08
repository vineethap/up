import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
import { ForgotPassword2Module } from './authentication/forgot-password-2/forgot-password-2.module';
import { LockModule } from './authentication/lock/lock.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';
import { NotfoundModule } from './authentication/notfound/notfound.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { Register2Module } from './authentication/register-2/register-2.module';
import { SurveyModule } from './authentication/survey/survey.module';
import { AcknowledgeModule } from './authentication/acknowledge/acknowledge.module';

@NgModule({
    imports: [
        // Auth
        LoginModule,
        ForgotPasswordModule,
        ForgotPassword2Module,
        ResetPasswordModule,
        LockModule,
        NotfoundModule,
        Register2Module,
        SurveyModule,
        AcknowledgeModule
    ],
    declarations: [PrivacyComponent]
})
export class PagesModule
{
}
