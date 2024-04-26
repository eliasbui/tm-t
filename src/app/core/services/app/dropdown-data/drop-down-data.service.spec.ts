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
import { MockCentreListBox, MockDistrictList } from 'src/app/shared/mockData/MockData';
import { DropdownDataService } from './drop-down-data.service';

describe('Dropdown Service', () => {

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
                    //useClass: MatDialogMock,
                },
                DropdownDataService
            ]
        });

    });

    it('should get list box data',
        () => {
            let service = TestBed.get(DropdownDataService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl = REAL_API_URL_2;
            const result = service.getDropdownData('abc').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockCentreListBox
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/getlistbox`).flush({
                error_code: '00',
                list_data: MockCentreListBox
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get list box data',
        () => {
            let service = TestBed.get(DropdownDataService);
            service.baseUrl = REAL_API_URL_2;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getlistbox('abc').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockCentreListBox
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/getlistbox`).flush({
                error_code: '00',
                list_data: MockCentreListBox
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get location data',
        () => {
            let service = TestBed.get(DropdownDataService);
            service.baseUrl = REAL_API_URL_2;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getLocationData('district', '001').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockDistrictList
                });
            });
            httpMock.expectOne(`${REAL_API_URL_2}/common/address`).flush({
                error_code: '00',
                list_data: MockDistrictList
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});