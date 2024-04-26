import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { mockDialogRef, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { FooterButtonComponent } from './footer-button.component';

describe("Footer button Component", () => {
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
            declarations: [FooterButtonComponent],
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
        const fixture = TestBed.createComponent(FooterButtonComponent);
        const app = fixture.debugElement.componentInstance;
        app.saveAction = {
            emit() { }
        }
        app.cancelAction = {
            emit() { }
        }
        fixture.detectChanges();
        spyOn(app.saveAction, 'emit').and.callThrough();
        app.save();
        expect(app.saveAction.emit).toHaveBeenCalled();
        spyOn(app.cancelAction, 'emit').and.callThrough();
        app.onNoClick();
        expect(app.cancelAction.emit).toHaveBeenCalled();
        expect(app).toBeTruthy();
    })
});