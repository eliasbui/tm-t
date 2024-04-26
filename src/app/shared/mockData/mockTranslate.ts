import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

@Injectable()
export class MockTranslateService extends TranslateService {
    instant(key: string) {
        return key;
    }
    get(key: string) {
        return of(key)
    }
}
@Injectable()
export class MockTranslateLoader extends TranslateLoader {
    getTranslation(lang: string) {
        return of(lang);
    }
}