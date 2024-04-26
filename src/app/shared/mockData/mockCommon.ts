import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { CommonService } from "@core/services";
import { Observable, of, throwError } from "rxjs";

export function MockRouterValue() {
    return {
        navigateByUrl(url: string) { return url; },
        navigate(urlParams2: string[], param2: any) {
            return {
                urlParams2,
                param2
            }
        },
        url: "/admin/user",
        events: of(new NavigationEnd(0, '/admin/user', '/admin/user')),
        routerState: {},
        routeReuseStrategy: {
            shouldReuseRoute() {

            }
        }
    }
}
@Injectable()
export class MockCommonService extends CommonService {
    GetListBoxData(requestData: string): Observable<any> {
        const result = {
            error_message: "success",
            error_code: "00",
            list_data: [
                {
                    value: "active",
                    desc: "Active",
                },
                {
                    value: "locked",
                    desc: "Inactive",
                },
                {
                    value: "wait",
                    desc: "PendingApproval",
                },
                {
                    value: "reject",
                    desc: "Rejected",
                },
            ],
        };
        return of(result);
    }
    getFileFromUrl(url: string): Observable<any> {
        if (url && url !== "") {
            return of(new ArrayBuffer(50));
        } else {
            return throwError({ status: "404" });
        }
    }
    getLocationData(key: string, id?: number): Observable<any> {
        return of({
            error_code: "00",
        });
    }

    getExtensionFile(fileName: string): string {
        return fileName?.split(".").pop();
    }
    convertFromArrayBufferToFile(
        arraybuffer: ArrayBuffer,
        fileType: string,
        fileName: string
    ) {
        const extent = this.getExtensionFile(fileName);
        const finalext = this.getfileTypeFromExtension(extent);
        const blob = new Blob([arraybuffer], { type: `${fileType}/${finalext}` });
        blob["name"] = fileName;
        blob["lastModifiedDate"] = new Date();
        let file = Object.assign(blob);
        return file;
    }
}