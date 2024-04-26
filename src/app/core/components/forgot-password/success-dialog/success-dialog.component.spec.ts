import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module'; import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';

import { DirectivesModule } from '@core/directives/directives.module';
import { SuccessDialogComponent } from './success-dialog.component';
import { LocalStorageType } from '@core/constants';

describe("Success Dialog Component", () => {
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
            declarations: [SuccessDialogComponent],
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
        const fixture = TestBed.createComponent(SuccessDialogComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.closeDialog();
        expect(app.dialogRef.close).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
    it("should create the app with eng", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.LoginLanguage).and.returnValue('en')
        const fixture = TestBed.createComponent(SuccessDialogComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.closeDialog();
        expect(app.dialogRef.close).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
    it("should create the app with no", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.LoginLanguage).and.returnValue(undefined)
        const fixture = TestBed.createComponent(SuccessDialogComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.closeDialog();
        expect(app.dialogRef.close).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
});