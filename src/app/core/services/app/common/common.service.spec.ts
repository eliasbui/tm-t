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
import { CommonService } from './common.service';
import { MockCentreListBox } from 'src/app/shared/mockData/MockData';





describe('Common Service', () => {

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
                CommonService
            ]
        });

    });

    it('should get list box data',
        () => {
            let service = TestBed.get(CommonService);
            let httpMock = TestBed.get(HttpTestingController);
            service.baseUrl = REAL_API_URL_2;
            const result = service.GetListBoxData('abc').subscribe((res: any) => {
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
    it('should get file data',
        () => {
            const blobSamplePdf = new Blob(["reughtrietiet"], { type: "pdf" });
            const expectedResult: ArrayBuffer = new ArrayBuffer(8);
            blobSamplePdf["lastModifiedDate"] = "";
            blobSamplePdf["name"] = "test1.pdf";
            let service = TestBed.get(CommonService);
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getFileFromUrl(`http://africau.edu/images/default/sample.pdf`).subscribe((res: any) => {
                expect(res).toEqual(expectedResult);
            });
            httpMock.expectOne(`http://africau.edu/images/default/sample.pdf`).flush(expectedResult);
            httpMock.verify();
            const resultConvertImage = service.convertFromArrayBufferToFile(expectedResult, 'image', 'result.png');
            const resultConvertDocx = service.convertFromArrayBufferToFile(expectedResult, 'doc', 'result.docx');
            const resultConvertDoc = service.convertFromArrayBufferToFile(expectedResult, 'doc', 'result.doc');
            expect(service).toBeTruthy();
        });
    it('should get file document',
        () => {
            const blobSamplePdf = new Blob(["reughtrietiet"], { type: "pdf" });
            const expectedResult: ArrayBuffer = new ArrayBuffer(8);
            blobSamplePdf["lastModifiedDate"] = "";
            blobSamplePdf["name"] = "test1.pdf";
            let service = TestBed.get(CommonService);
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.downloadFileFromUrl(`http://africau.edu/images/default/sample.pdf`);
            httpMock.expectOne(`http://africau.edu/images/default/sample.pdf`).flush(blobSamplePdf);
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should excute data',
        () => {
            let service = TestBed.get(CommonService);
            const resultTranslate = service.getTranslation('abc.def');
            const resultRemoveAccents = service.removeAccents('đi đâu đấy bô');
            const resultSearchLike = service.searchLike('đi đâu đấy bô');
            service.specialExport({
                nameReport: "report1",
                nameUnit: "unit1",
                reportType: "report1",
                data: {
                    table_data: []
                },
                total: "1000"
            });
            const data = {
                tableName: "report1",
                reportCode: "code001",
                showTransactionType: true,
                titleReport: "title01",
                toDate: "22/01/2021",
                htmlParent: {
                    nativeElement: {
                        innerHTML: "ab23123"
                    }
                }
            }
            // service.savePdf(data);
            expect(resultTranslate).toEqual('abc.def');
            expect(resultRemoveAccents).toEqual('DI DAU DAY BO');
            expect(resultSearchLike).toEqual('đi đâu đây bô');
            expect(service).toBeTruthy();
        });
});