import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { DocumentViewerComponent } from './document-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// export const ConfirmData = {
//     message: 'Confirm',
//     title: 'Are you sure',
//     confirm: 'Confirm content',
//     yes() { }
// }
describe("DocumentViewer Component", () => {
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
                PdfViewerModule,
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [DocumentViewerComponent],
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
                // {
                //     provide: MAT_DIALOG_DATA,
                //     useValue: ConfirmData
                // }
            ],
        }).compileComponents();

    }));

    it("should create the app with pdf", () => {
        const fixture = TestBed.createComponent(DocumentViewerComponent);
        const app = fixture.debugElement.componentInstance;
        const blobImageShop = new Blob(["reughtrietiet"], { type: "doc/pdf" });
        blobImageShop["lastModifiedDate"] = "";
        blobImageShop["name"] = "test1.pdf";
        app.docFile = blobImageShop;
        fixture.detectChanges();
        app.close();
        expect(app.dialogRef.close).toHaveBeenCalled();
        app.changeError();
        expect(app.error).toBeTruthy()
        expect(app).toBeTruthy();
    })
    it("should create the app with docx", () => {
        const fixture = TestBed.createComponent(DocumentViewerComponent);
        const app = fixture.debugElement.componentInstance;
        const blobImageShop = new Blob(["reughtrietiet"], { type: "doc/docx" });
        blobImageShop["lastModifiedDate"] = "";
        blobImageShop["name"] = "test1.docx";
        app.docFile = blobImageShop;
        fixture.detectChanges();
        expect(app).toBeTruthy();
    })
});