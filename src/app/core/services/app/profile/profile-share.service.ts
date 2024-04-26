import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileShare {
    private profileInstance = new Subject<any>();
    setProfileInfo(profileName: string, avatarUrl: string) {
        this.profileInstance.next({
            profileName,
            avatarUrl
        });
    }
    clearProfile() {
        this.profileInstance.next();
    }
    getProfileInfo(): Observable<any> {
        return this.profileInstance.asObservable();
    }
}
