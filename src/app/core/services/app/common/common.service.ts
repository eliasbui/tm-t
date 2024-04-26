import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@core/services/configuration/configuration.service';
import { linkCss } from '@core/constants/style-print';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl = '';
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private config: ConfigService
  ) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.REAL_API_URL
        ? this.config.config.API_ENDPOINTS.REAL_API_URL
        : '';
  }

  public GetListBoxData(requestData: string): Observable<any> {
    const body = {
      key: requestData,
    };
    return this.http.post(`${this.baseUrl}/getlistbox`, body);
  }

  public getListSubMerchant(): Observable<any> {
    return this.http.post(`${this.baseUrl}/getlistmerchant`, {});
  }

  public getFileFromUrl(requestUrl: string): Observable<any> {
    return this.http.get(requestUrl, { responseType: 'arraybuffer' });
  }

  public convertFromArrayBufferToFile(
    arraybuffer: ArrayBuffer,
    fileType: string,
    fileName: string
  ): File {
    const extent = this.getExtensionFile(fileName);
    const finalext = this.getfileTypeFromExtension(extent);
    const blob = new Blob([arraybuffer], { type: `${fileType}/${finalext}` });
    const file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = fileName;
    // return <File>file;
    return new File([blob], fileName, { type: `${fileType}/${extent}` });
  }

  getfileTypeFromExtension(extend: string) {
    let result = extend;
    if (extend?.toLowerCase().trim() === 'doc') {
      result = 'msword';
    }
    if (extend?.toLowerCase().trim() === 'docx') {
      result = 'vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    return result;
  }

  public getExtensionFile(fileName: string): string {
    return fileName.split('.').pop();
  }

  public getDocumentFile(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'blob' });
  }

  public getTranslation(key) {
    let translation = '';
    this.translate.get(key).subscribe((data) => {
      translation = data;
    });
    return translation;
  }

  public getFileNameFromUrl(url: string) {
    return url && url !== '' ? url.substring(url.lastIndexOf('/') + 1) : '';
  }

  public removeAccents(str) {
    let r = str.toLowerCase();
    r = r.replace(new RegExp('[áàảãạăắằẳẵặâấầẩẫậ]', 'g'), 'a');
    r = r.replace(new RegExp('[èéẻẽẹêềếểễệ]', 'g'), 'e');
    r = r.replace(new RegExp('[ìíỉĩị]', 'g'), 'i');
    r = r.replace(new RegExp('[òóỏõọôồốổỗộơờớởỡợ]', 'g'), 'o');
    r = r.replace(new RegExp('[ùúủũụưừứửữự]', 'g'), 'u');
    r = r.replace(new RegExp('[ỳýỷỹỵ]', 'g'), 'y');
    r = r.replace(new RegExp('[đ]', 'g'), 'd');
    return r.toUpperCase();
  }

  public searchLike(str) {
    if (str) {
      let r = str.toLowerCase();
      r = r.replace(new RegExp('[áàảãạ]', 'g'), 'a');
      r = r.replace(new RegExp('[ắằẳẵặ]', 'g'), 'ă');
      r = r.replace(new RegExp('[ấầẩẫậ]', 'g'), 'â');
      r = r.replace(new RegExp('[èéẻẽẹ]', 'g'), 'e');
      r = r.replace(new RegExp('[ềếểễệ]', 'g'), 'ê');
      r = r.replace(new RegExp('[ìíỉĩị]', 'g'), 'i');
      r = r.replace(new RegExp('[òóỏõọ]', 'g'), 'o');
      r = r.replace(new RegExp('[ồốổỗộ]', 'g'), 'ô');
      r = r.replace(new RegExp('[ờớởỡợ]', 'g'), 'ơ');
      r = r.replace(new RegExp('[ùúủũụ]', 'g'), 'u');
      r = r.replace(new RegExp('[ừứửữự]', 'g'), 'ư');
      r = r.replace(new RegExp('[ỳýỷỹỵ]', 'g'), 'y');
      return r;
    } else {
      return '';
    }
  }

  paginateReport(data, page, pageSize) {
    return data?.slice((page - 1)*pageSize, page*pageSize)
  }

  // hiển thị thông tin có thể multi language
  // Ex: "|12| Mum Shop |13|. |7|. "
  multiLangData(str) {
    if (str) {
      let arr = str.trim().split("|");
      arr = arr.filter(x => !isNaN(x) && x !== "");
      arr.forEach(e => {
        const from = "|" + e + "|";
        const to = this.translate.instant("notification." + e);
        str = str.replace(from, to);
      });
    }
    return str;
  }
}
