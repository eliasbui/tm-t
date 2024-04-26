import { of } from 'rxjs';
export class MockEvent {
    public target: any;
    public keyCode: any
    stopPropagation() {
    }
    preventDefault() {

    }

    constructor() {
        return {
            target: {
                value: '',
                files: []
            },
            keyCode: 0,
            stopPropagation() {
            },
            preventDefault() {

            }
        }
    }
}

export class MatDialogMock {
    open() {
        return {
            componentInstance: {

            },
            afterClosed: () => {
                return of(true)
            }
        };
    }
    closeAll() { }
}
export const mockDialogRef = {
    close: jasmine.createSpy('close'),
    closeAll: jasmine.createSpy('closeAll'),
};
export function MockActivatedRouteValue(param: any, queryParams: any) {
    return {
        paramMap: param,
        queryParams
    }
}
export function MockActivatedRouteValueWithParam(param: any, queryParams: any) {
    return {
        params: param,
        queryParams
    }
}
export function MockActivatedRouteValueWithSnapshotParam(param: any, queryParams: any) {
    return {
        params: param,
        snapshot: {
            queryParams
        }

    }
}