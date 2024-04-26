import { async, TestBed } from "@angular/core/testing";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BackgroundLoader } from "@core/services";
import {
    TranslateModule,
    TranslateLoader,
    TranslateFakeLoader,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { MaterialModule } from "src/app/shared/shared/material.module";
import {
    mockDialogRef,
    MatDialogMock,
} from "src/app/shared/mockData/MockDialog";
import { FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BreadcrumbComponent } from './breadcrumb.component';
import { UserDetailComponent } from '@web/user/user-detail/user-detail.component';
import * as _ from "lodash";

describe("Bread crumb Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'admin/user/detail',
                        component: UserDetailComponent
                    },
                    {
                        path: '',
                        component: UserDetailComponent
                    }
                ]),
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient],
                    },
                }),
                MaterialModule,
                ToastrModule.forRoot(),
                BrowserAnimationsModule,
            ],
            declarations: [BreadcrumbComponent],
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
                FormBuilder,
            ],
        }).compileComponents();
    }));

    it("should create the app and navigate , get the breadcrumb config", () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.router.navigateByUrl('admin/user/detail');
        expect(app).toBeTruthy();
    });
    it("should create the app and navigate , get breadcrumb with wrong url", () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.router.navigateByUrl('');
        expect(app).toBeTruthy();
    });
});
