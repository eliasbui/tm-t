import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader, AuthenticationAndAuthorizationService, ProfileShare } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock, MockEvent } from 'src/app/shared/mockData/MockDialog';
import { DirectivesModule } from '@core/directives/directives.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MockAuthService, MockUserData, MockUserInfo, MockActions } from 'src/app/shared/mockData/mockAuthService';
import { Injectable } from '@angular/core';
import { LocalStorageType } from '@core/constants';
import { RegisterComponent } from './register.component';
@Injectable()
export class MockProfileShare extends ProfileShare {
    getProfileInfo() {
        return of({
            profileName: 'PLS',
            avatarUrl: ''
        })
    }
}
describe("Register Dialog Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule,
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
                ToastrModule.forRoot(),
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [RegisterComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                BackgroundLoader,
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: AuthenticationAndAuthorizationService,
                    useClass: MockAuthService
                },
                {
                    provide: ProfileShare,
                    useClass: MockProfileShare
                },
                FormBuilder,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        profile: {},
                        langs: [
                            {
                                value: '01',
                                desc: 'vi'
                            },
                            {
                                value: '02',
                                desc: 'en'
                            }
                        ]
                    }
                },

            ],
        }).compileComponents();

    }));

    it("should create the app ", () => {
        const fixture = TestBed.createComponent(RegisterComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.onSubmit();
        expect(app).toBeTruthy();
    })

});