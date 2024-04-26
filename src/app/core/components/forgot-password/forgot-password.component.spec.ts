import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module'; import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { RouterTestingModule } from "@angular/router/testing";
import { DirectivesModule } from '@core/directives/directives.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageType, TitleConstants } from '@core/constants';
import { of } from 'rxjs';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

describe("Forgot Password Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'forgot-password',
                        component: ForgotPasswordComponent,
                        data: {
                            title: TitleConstants.FORGOT
                        },
                        canActivate: []
                    },
                    {
                        path: 'reset-password',
                        component: ResetPasswordComponent,
                        data: {
                            title: TitleConstants.RESETPW
                        },
                        canActivate: []
                    }
                ]),
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient],
                    },
                }),
                MaterialModule,
                DirectivesModule,
                ReactiveFormsModule
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [ForgotPasswordComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                FormBuilder,
                BackgroundLoader,
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                // {
                //     provide: MAT_DIALOG_DATA,
                //     useValue: ConfirmData
                // }
            ],
        }).compileComponents();

    }));

    it("should create the app with no default lang", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.LoginLanguage).and.returnValue(undefined)
        const fixture = TestBed.createComponent(ForgotPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app.profileService, 'confirmResetPws').and.returnValue(
            of({
                ref_id: 'ref_id001'
            }));
        app.resetPasswords('pls@gmail.com');
        app.f['email'].setValue('0943475838');
        app.resetPasswords('pls@gmail.com');
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app with default lang", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.LoginLanguage).and.returnValue('en')
        const fixture = TestBed.createComponent(ForgotPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        spyOn(app.profileService, 'confirmResetPws').and.returnValue(
            of({
                ref_id: undefined
            }));
        app.f['email'].setValue('0943475838');
        app.resetPasswords('pls@gmail.com');
        expect(app).toBeTruthy();
    })
});