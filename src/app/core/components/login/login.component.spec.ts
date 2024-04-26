import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader, AuthenticationAndAuthorizationService } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock, MockEvent, MockActivatedRouteValueWithSnapshotParam } from 'src/app/shared/mockData/MockDialog';

import { DirectivesModule } from '@core/directives/directives.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { LocalStorageType } from '@core/constants';
import { MockAuthService } from 'src/app/shared/mockData/mockAuthService';
import { of } from 'rxjs';
import { MockLeftMenu } from 'src/app/shared/mockData/MockData';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouterValue } from 'src/app/shared/mockData/mockCommon';

describe("Login Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
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
                CoreModule,
                SharedModule,
                ReactiveFormsModule,
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [LoginComponent],
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
                    useClass: MockAuthService,
                },
                FormBuilder,
                {
                    provide: Router,
                    useValue: MockRouterValue(),
                },
                {
                    provide: ActivatedRoute,
                    useValue: MockActivatedRouteValueWithSnapshotParam(
                        of<any>(
                            {
                                id: '00',
                                get(att: string) {
                                    return this.id
                                }
                            }
                        ),
                        {
                            returnUrl: "/"
                        }
                    ),
                },
                // {
                //     provide: MAT_DIALOG_DATA,
                //     useValue: ConfirmData
                // }
            ],
        }).compileComponents();

    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app 1", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(MockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'doLogin').and.returnValue(
            of({ user_id: '01' })
        )
        fixture.detectChanges();
        const event = new MockEvent();
        app.enter(event);
        app.f['username'].setValue('pls@gmail.com');
        app.f['password'].setValue('@bc12345A');
        app.enter(event);
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app 2", () => {
        const mockLeftMenu: any = [];
        MockLeftMenu.forEach((val, index) => {
            if (index !== 0) {
                mockLeftMenu.push(val);
            }
        })
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(mockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'doLogin').and.returnValue(
            of({
                is_change_password: 1
            })
        )
        fixture.detectChanges();
        const event = new MockEvent();
        app.enter(event);
        app.f['username'].setValue('pls@gmail.com');
        app.f['password'].setValue('@bc12345A');
        app.enter(event);
        app.togglePw();
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app 3", () => {
        const mockLeftMenu: any = [];
        MockLeftMenu.forEach((val, index) => {
            if (index !== 0) {
                mockLeftMenu.push(val);
            }
        })
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(mockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'doLogin').and.returnValue(
            of('02')
        )
        fixture.detectChanges();
        const event = new MockEvent();
        app.enter(event);
        app.f['username'].setValue('pls@gmail.com');
        app.f['password'].setValue('@bc12345A');
        app.enter(event);
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app 4", () => {
        const mockLeftMenu: any = [];
        MockLeftMenu.forEach((val, index) => {
            if (index !== 0) {
                mockLeftMenu.push(val);
            }
        })
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(mockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'doLogin').and.returnValue(
            of('02')
        )
        fixture.detectChanges();
        const event = new MockEvent();
        app.enter(event);
        app.f['username'].setValue('pls@gmail.com');
        app.f['password'].setValue('@bc12345A');
        app.enter(event);
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app 5", () => {
        const mockLeftMenu: any = [];
        MockLeftMenu.forEach((val, index) => {
            if (index !== 0) {
                mockLeftMenu.push(val);
            }
        })
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(mockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'checkLogin').and.returnValue(true);
        fixture.detectChanges();
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
    it("should create the app 6", () => {
        const mockLeftMenu: any = [];
        MockLeftMenu.forEach((val, index) => {
            if (index !== 0) {
                mockLeftMenu.push(val);
            }
        })
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(JSON.stringify(true))
            .withArgs(LocalStorageType.UserInformation).and.returnValue(JSON.stringify(null))
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue('vi')
            .withArgs(LocalStorageType.SideBarConfig).and.returnValue(JSON.stringify(mockLeftMenu))
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, 'checkLogin').and.returnValue(true);
        fixture.detectChanges();
        expect(app).toBeTruthy();
        expect(app.f).toBeTruthy();
    })
});