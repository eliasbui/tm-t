import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export class MultiTranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient,
    // tslint:disable-next-line: align
    public resources = []) { }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {

    return forkJoin(this.resources.map(config => {
      return this.http.get(`../assets/i18n/${lang}/${config}.json`);
    })).pipe(map(response => {
      return response.reduce((a, b) => {
        return Object.assign(a, b);
      });
    }));
  }
}
