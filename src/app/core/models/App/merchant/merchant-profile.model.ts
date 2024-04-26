export class MerchantDetaiResponse {
  public merchant_id: number;
  public merchant_code: number;
  public merchant_name: string;
  public merchant_biz_name: string;
  public master_name: string;
  public agent_name: string;
  public agent_phone: string;
  public agent_email: string;
  public master_id: number;
  public agent_identity: string;
  public company_type: string;
  public business_type: string;
  public business_type_name: string;
  public tax_code: string;
  public address: string;
  public created_date: string;
  public province: CommonModel;
  public district: CommonModel;
  public commune: CommonModel;
  public company_type_name: string;
  public website: string;
  public status: number;
  public status_name: string;
  public additional_infomation: AdditionalInfomation;
  public contract: Contract;
  public payment_method: PaymentMethod[];
  public fee: FeeModel[];
  public payment_info: PaymentInfo;
  public status_display?: string;

  constructor(fields?: Partial<MerchantDetaiResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class AdditionalInfomation {
  public address: string;
  public staff_code: string;
  public image_shop?: [];
  public shop_image_name: [];
  public agent_identity_image: [];
  public agent_identity_image_name: [];
  public bsn_registration_cerfiticate: string;
  public bsn_name: string;
  public agency_id: number;
  public agency_name: string;

  constructor(fields?: Partial<AdditionalInfomation>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class CommonModel {
  public id: number;
  public name: string;

  constructor(fields?: Partial<CommonModel>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class Contract {
  public sign_date: string;
  public contract_image: [];
  public expire_date: string;
  public contract_status: number;
  public contract_status_name: string;
  public service_status: number;
  public service_status_name: string;

  constructor(fields?: Partial<Contract>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class PaymentMethod {
  public method_id: number;
  public method_name: string;
  public activated: number;

  constructor(fields?: Partial<PaymentMethod>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class FeeModel {
  public method_id: number;
  public method_name: string;
  public maintaining_fee: number;
  public transaction_fee_percent: number;
  public transaction_fee_fixed: number;
  public payment_fee_fixed: number;
  public payment_fee_percent: number;
  public refund_fee_percent: number;
  public refund_fee_fixed: number;

  constructor(fields?: Partial<FeeModel>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class PaymentInfo {
  public settlement_day: string;
  public holder_name: string;
  public bank: string;
  public pan: string;

  constructor(fields?: Partial<PaymentInfo>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class BasicInforRequest {
  public merchant: MerchantBasicInfor;

  constructor(fields?: Partial<BasicInforRequest>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class MerchantBasicInfor {
  public merchant_id: number;
  public master_id: number;
  public agent_phone: string;
  public agent_email: string;
  public agent_identity: string;
  public company_type: string;
  public business_type: string;
  public tax_code: string;
  public address: string;
  public province_id: number;
  public district_id: number;
  public commune_id: number;
  public website: string;

  constructor(fields?: Partial<MerchantBasicInfor>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}