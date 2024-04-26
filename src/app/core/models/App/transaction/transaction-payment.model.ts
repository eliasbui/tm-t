export class SearchRequest {
  public order_number?: string;
  public status?: string;
  public payment_method?: number;
  public payment_channel?: number;
  public transaction_ref?: string;
  public from_date?: string;
  public to_date?: string;
  public page?: number;
  public size?: number;

  constructor(fields?: Partial<SearchRequest>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class SearchResponse {
  public merchant_code?: string;
  public merchant_name?: string;
  public transaction_ref?: string;
  public payment_channel?: string;
  public transaction_id?: string;
  public status_name?: string;
  public order_info?: string;
  public order_number?: string;
  public payment_method?: string;
  public transaction_time?: string;
  public transaction_amount?: string;
  public currency?: string;

  constructor(fields?: Partial<SearchResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class SearchAdvanceRequest {
  public phone?: string;
  public account?: string;
  public card?: string;
  public issuer?: string;
  public service_type?: string;
  public payment_method?: string;
  public sub_merchant?: string;
  public from_date?: string;
  public to_date?: string;
  public page?: string;
  public size?: string;

  constructor(fields?: Partial<SearchAdvanceRequest>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class SearchAdvanceResponse {
  public merchant_code?: string;
  public merchant_name?: string;
  public transaction_ref?: string;
  public payment_channel?: string;
  public transaction_id?: string;
  public status_name?: string;
  public order_info?: string;
  public order_number?: string;
  public payment_type?: string;
  public customer_phone?: string;
  public pan?: string;
  public created_at?: string;
  public amount?: string;
  public currency?: string;

  constructor(fields?: Partial<SearchAdvanceResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class TransactionRequest {
  public transaction_id?: string;

  constructor(fields?: Partial<TransactionRequest>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class TransactionResponse {
  public error_code: string;
  public error_message: string;
  public data?: TransactionPayment;

  constructor(fields?: Partial<TransactionResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}


export class TransactionPayment {
  public merchant_code: string;
  public merchant_name: string;
  public transaction_id: string;
  public status_name: string;
  public payment_method: string;
  public payment_channel: string;
  public transaction_time: string;
  public transaction_amount: number;
  public currency: string;
  public order_reference: string;
  public order_info: string;
  public fee: number;
  public promotion: number;
  public total_amount: number;
  public payment_info: PaymentInfor;
  public transaction_history: TransactionHistory[];
  public refund: PaymentRefund;

  constructor(fields?: Partial<TransactionResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class PaymentInfor {
  public customer_name: string;
  public phone: string;
  public payment_channel: string;
  public payment_method: string;
  public pan: string;
  public issuer: string;
  public activated_date: string;

  constructor(fields?: Partial<PaymentInfor>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class TransactionHistory {
  public time: string;
  public action: string;

  constructor(fields?: Partial<TransactionHistory>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class PaymentRefund {
  public total_amount: number;
  public list_data: ListDataPaymentRefund[];

  constructor(fields?: Partial<PaymentRefund>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class ListDataPaymentRefund {
  public refund_ref: string;
  public refund_id: string;
  public refund_amount: number;
  public refund_info: string;
  public refund_status: string;
  public refund_time: string;

  constructor(fields?: Partial<ListDataPaymentRefund>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
