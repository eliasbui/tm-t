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
import { UserDetailComponent } from '@web/user/user-detail/user-detail.component';
import { LayoutComponent } from './layout.component';
import { Router } from "@angular/router";
import { MockRouterValue } from "src/app/shared/mockData/mockCommon";
import { MockRouter } from "src/app/shared/mockData/mockAuthService";

describe("Layout Component", () => {
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
            declarations: [LayoutComponent],
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
                // { provide: Router, useClass: MockRouter },
                FormBuilder,
            ],
        }).compileComponents();
    }));

    it("should create the app and navigate ", () => {
        const fixture = TestBed.createComponent(LayoutComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        // app.sidenav = {
        //     opened: true
        // }        
        app.router.navigateByUrl('admin/user/detail');
        app.toggleMenu();
        expect(app).toBeTruthy();
    });
});
