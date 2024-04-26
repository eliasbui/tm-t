import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { DialogConfirmComponent } from './dialog-confirm.component';
export const ConfirmData = {
    message: 'Confirm',
    title: 'Are you sure',
    confirm: 'Confirm content',
    yes() { }
}
describe("Dialog Confirm Component", () => {
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
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [DialogConfirmComponent],
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
                    provide: MAT_DIALOG_DATA,
                    useValue: ConfirmData
                }
            ],
        }).compileComponents();

    }));

    it("should create the app ", () => {
        const fixture = TestBed.createComponent(DialogConfirmComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        expect(app.message).toEqual(ConfirmData.message);
        expect(app.title).toEqual(ConfirmData.title);
        expect(app.confirm).toEqual(ConfirmData.confirm);
        spyOn(app.data, 'yes').and.callThrough();
        app.onYesClick();
        expect(app.data.yes).toHaveBeenCalled();
        app.onNoClick();
        expect(app.dialogRef.close).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
});