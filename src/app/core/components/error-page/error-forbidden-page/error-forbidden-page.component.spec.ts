import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageType } from '@core/constants';
import { BackgroundLoader, AuthenticationAndAuthorizationService, CommonService } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockAuthService, MockRouter } from 'src/app/shared/mockData/mockAuthService';
import { MockRouterValue } from 'src/app/shared/mockData/mockCommon';

import { MockActivatedRouteValue, MatDialogMock } from 'src/app/shared/mockData/MockDialog';
import { MockTranslateService } from 'src/app/shared/mockData/mockTranslate';;
import { MaterialModule } from 'src/app/shared/shared/material.module';

import { ErrorForbiddenPageComponent } from './error-forbidden-page.component';

describe("Error forbidden page Component", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        BsDatepickerModule.forRoot(),
      ],
      declarations: [ErrorForbiddenPageComponent],
      providers: [
        BackgroundLoader,
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRouteValue(
            undefined,
            of<any>({
              page: 1,
              size: 10,
            })
          ),
        },
        {
          provide: AuthenticationAndAuthorizationService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useValue: MockRouterValue(),
        },
        CommonService,
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ],
    }).compileComponents();
  }));
  it("should create the app with no user displayed", () => {
    const fixture = TestBed.createComponent(ErrorForbiddenPageComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage, 'getItem').withArgs(LocalStorageType.DefaultUrl).and.returnValue('abc')
    app.navigateToHomePage();
    expect(app).toBeTruthy();
  });
});
