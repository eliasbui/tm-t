import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageType, REAL_API_URL, REAL_API_URL_2 } from '@core/constants';
import { MockUserInfo, MockLeftMenuConfig, MockLoginUserInfo, MockRights, MockPermissionUrl } from 'src/app/shared/mockData/mockAuthService';
import { DeviceDetectorService } from 'ngx-device-detector';
import { of } from 'rxjs';
import { MockTranslateLoader, MockTranslateService } from 'src/app/shared/mockData/mockTranslate';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { MockNoti, MockProfile, MockHistory } from 'src/app/shared/mockData/MockData';
import { ProfileService } from './profile.service';
import { ProfileShare } from './profile-share.service';


describe('Profile Service', () => {

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateModule,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient],
                    },
                }),
                // MaterialModule,
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: TranslateLoader,
                    useClass: MockTranslateLoader,
                },
                {
                    provide: TranslateService,
                    useClass: MockTranslateService,
                },
                {
                    provide: MatDialog,
                    // useClass: MatDialogMock,
                },
                ProfileService,
                ProfileShare
            ]
        });
    });

    it('Profile-should profile detail',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = REAL_API_URL_2;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.detailProfile().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockProfile,
                    history: MockHistory
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/account/detail`).flush({
                error_code: '00',
                data: MockProfile,
                history: MockHistory
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-should update profile',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = REAL_API_URL_2;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.updateProfile({
                fullname: 'Nguyễn Văn A',
                phone: '09437458345',
                language: 'en'
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/account/profile/edit`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-should update password',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = REAL_API_URL_2;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.updatePassword({
                old_password: 'Abc@1234',
                new_password: 'Abc@12345657'
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/account/profile/update-password`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-should get lang list',
        () => {
            const mockLangList = [
                { des: 'vi' },
                { des: 'en' }
            ]
            const mockLangResult = [
                { des: 'languageList.vi' },
                { des: 'languageList.en' }
            ]
            let service = TestBed.get(ProfileService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl = REAL_API_URL_2;
            const result = service.getLanguageList().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: mockLangResult
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/getlistbox`).flush({
                error_code: '00',
                list_data: mockLangList
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-should get histoty',
        () => {
            let service = TestBed.get(ProfileService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl = REAL_API_URL_2;
            const result = service.getActivityHistory({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockHistory
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/account/actions`).flush({
                error_code: '00',
                list_data: MockHistory
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-confirmResetPassword',
        () => {
            let service = TestBed.get(ProfileService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl2 = REAL_API_URL;
            const result = service.confirmResetPws({ contact: 'pls@gmail.com' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${REAL_API_URL}/forgot-password`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('Profile-confirm new password',
        () => {
            let service = TestBed.get(ProfileService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl2 = REAL_API_URL;
            const result = service.confirmNewPassWord(
                {
                    ref_id: '00232',
                    otp: 'Abc1234',
                    new_password: '@bc1234N'
                }).subscribe((res: any) => {
                    expect(res).toEqual({
                        error_code: '00'
                    });
                });
            httpMock.expectOne(`${REAL_API_URL}/confirm-password`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('ProfileShare-set image and name',
        () => {
            let service = TestBed.get(ProfileShare);
            const mockProfileInfo = {
                profileName: 'Nguyen Van A',
                avatarUrl: '/assets/images/default-user.png'
            }
            service.setProfileInfo(mockProfileInfo.profileName, mockProfileInfo.avatarUrl);
            service.getProfileInfo().subscribe((res1: any) => {
                expect(res1).toEqual(mockProfileInfo);
            });
            expect(service).toBeTruthy();
        });
    it('ProfileShare-clear image and name',
        () => {
            let service = TestBed.get(ProfileShare);
            service.clearProfile();
            service.getProfileInfo().subscribe((res1: any) => {
                expect(res1).toBeFalsy();
            });
            expect(service).toBeTruthy();
        });
});