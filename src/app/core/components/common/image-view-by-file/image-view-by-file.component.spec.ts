import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { ImageViewByFileComponent } from './image-view-by-file.component';
import { DirectivesModule } from '@core/directives/directives.module';

describe("Image View By File Component", () => {
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
                DirectivesModule
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [ImageViewByFileComponent],
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

    it("should create the app", () => {
        const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
        blobImageShop["lastModifiedDate"] = "";
        blobImageShop["name"] = "test1.jpg";
        const fixture = TestBed.createComponent(ImageViewByFileComponent);
        const app = fixture.debugElement.componentInstance;
        app.imageUrlStatus = false;
        app.imageUrl = blobImageShop;
        fixture.detectChanges();
        app.cancel();
        expect(app.dialogRef.close).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
    // it("should create the app with wrong image url", () => {
    //     const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
    //     blobImageShop["lastModifiedDate"] = "";
    //     blobImageShop["name"] = "test1.jpg";
    //     const fixture = TestBed.createComponent(ImageViewByFileComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     app.imageUrlStatus = true;
    //     app.imageUrl = 'abc/abc.png';
    //     fixture.detectChanges();
    //     expect(app).toBeTruthy();
    // })
});