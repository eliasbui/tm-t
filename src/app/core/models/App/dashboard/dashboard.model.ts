export class db_transactions {
    public transaction_ref: string;
    public transaction_id: string;
    public transaction_time: string;
    public status_name: string;
    public transaction_amount: string;
    public currency: string;
}
export class db_statistic {
    public today: statistic_info;
    public month: statistic_info;
    public refund: statistic_info;
}
export class statistic_info {
    public name: string;
    public value: number;
    public count: number;
}