export class StatusHelper {
    // static convertToStringStatus(value) {
    //     let result = '';
    //     if (value === TransactionStatus['Thành công']) {
    //         result = 'Thành công';
    //     } else if (value === TransactionStatus['Lỗi hệ thống']) {
    //         result = 'Lỗi hệ thống';
    //     } else if (value === TransactionStatus['Đang thực hiện']) {
    //         result = 'Đang thực hiện';
    //     }
    //     return result;
    // }
    static getStatusText(id, statusArray: any[]): string {
        return (statusArray.filter(data => data.id === id).length > 0) ? statusArray.filter(data => data.id === id)[0].name : '';
    }

    static getStatusColor(cond: string) {
        switch (cond) {
            case '00':
                return 'text-center text-white ite-status-00 max-width-status w-100 badge';
            case '01':
                return 'text-center text-white ite-status-01 max-width-status w-100 badge';
            case '02':
                return 'text-center text-white ite-status-02 max-width-status w-100 badge';
            case '04':
                return 'text-center text-white ite-status-04 max-width-status w-100 badge';
            case '05':
                return 'text-center text-white ite-status-05 max-width-status w-100 badge';
            default:
                return 'text-center text-white ite-status-06 max-width-status w-100 badge';
        }
    }

    static getActiveColor(cond: string) {
        switch (cond) {
            case '00':
                return 'w-100 badge badge-success text-center text-white max-width-status';
            case '01':
                return 'w-100 badge badge-warning text-center text-white max-width-status';
            default:
                return 'w-100 badge badge-danger text-center text-white max-width-status';
        }
    }
    static getActiveColorStatus(cond: string) {
        switch (cond) {
            case '1':
                return 'w-100 badge badge-success text-center text-white max-width-status';
            case '0':
                return 'w-100 badge badge-warning text-center text-white max-width-status';
            default:
                return 'w-100 badge badge-danger text-center text-white max-width-status';
        }
    }
}

