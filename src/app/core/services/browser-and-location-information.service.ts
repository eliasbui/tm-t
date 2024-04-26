import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_INFO, LocalStorageType } from '@core/constants';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from './configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class BrowserAndLocationInformationService {
    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private config: ConfigService
    ) {
        window.navigator.geolocation.getCurrentPosition(data => this.location = {
            long: data.coords.longitude,
            lat: data.coords.latitude
        });
        const ip_api =
            this.config &&
                this.config.config &&
                this.config.config.API_ENDPOINTS &&
                this.config.config.API_ENDPOINTS.IP_API_URL
                ? this.config.config.API_ENDPOINTS.IP_API_URL
                : '';
        this.IP = '192.168.1.1';
    }
    private location: any;
    private IP: any;
    public static getInfo(): any {
        return {
            device: {
                os: {
                    name: sessionStorage.getItem(BROWSER_INFO.OS.NAME),
                    version: sessionStorage.getItem(BROWSER_INFO.OS.VERSION)
                },
                browser: {
                    name: sessionStorage.getItem(BROWSER_INFO.BROWSER.NAME),
                    version: sessionStorage.getItem(BROWSER_INFO.BROWSER.VERSION)
                },
                location: {
                    long: Number(sessionStorage.getItem(BROWSER_INFO.LOCATION.LONG)),
                    lat: Number(sessionStorage.getItem(BROWSER_INFO.LOCATION.LAT))
                }
            },
            ip_address: sessionStorage.getItem(BROWSER_INFO.IP_ADD)
        };
    }
    public setInfoToStorage() {
        const deviceInfo = this.deviceService.getDeviceInfo();
        window.navigator.geolocation.getCurrentPosition(data => {
            sessionStorage.setItem(BROWSER_INFO.LOCATION.LAT, data.coords.latitude.toString());
            sessionStorage.setItem(BROWSER_INFO.LOCATION.LONG, data.coords.longitude.toString());
        });
        sessionStorage.setItem(BROWSER_INFO.IP_ADD, this.IP);
        sessionStorage.setItem(BROWSER_INFO.BROWSER.NAME, deviceInfo.browser);
        sessionStorage.setItem(BROWSER_INFO.BROWSER.VERSION, deviceInfo.browser_version);
        sessionStorage.setItem(BROWSER_INFO.OS.NAME, deviceInfo.os);
        sessionStorage.setItem(BROWSER_INFO.OS.VERSION, deviceInfo.os_version);
        if (!localStorage.getItem(LocalStorageType.LoginLanguage)) {
            localStorage.setItem(LocalStorageType.LoginLanguage, "vi");
        }
    }
}
