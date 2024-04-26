export const MockStaffList = [
  {
    staff_code: "STAFF205",
    staff_name: "Trần Văn STAFF 205",
    phone: "0989988205",
    birthday: "13/05/2020",
    identity: "123456205",
  },
  {
    staff_code: "STAFF204",
    staff_name: "Trần Văn STAFF 204",
    phone: "0989988204",
    birthday: "13/05/2020",
    identity: "123456204",
  },
  {
    staff_code: "STAFF203",
    staff_name: "Trần Văn STAFF 203",
    phone: "0989988203",
    birthday: "13/05/2020",
    identity: "123456203",
  },
  {
    staff_code: "STAFF202",
    staff_name: "Trần Văn STAFF 202",
    phone: "0989988202",
    birthday: "13/05/2020",
    identity: "123456202",
  },
  {
    staff_code: "STAFF201",
    staff_name: "Trần Văn STAFF 201",
    phone: "0989988201",
    birthday: "13/05/2020",
    identity: "123456201",
  },
];
export const MockQR = [
  {
    qr_id: "1594024741856788246",
    sub_id: 100901,
    merchant_name: "CANIFA",
    merchant_code: "MC100901",
    qr_name: "QR SP",
    qr_type: "product",
    qr_url: "http://35.223.25.100:8003/vtl-pg-qr/view/1594024741856788246",
    status: "Active",
    des: "SP123",
    product_code: "SP123",
    staff_code: null,
    amount: 112000,
    currency: "VND",
    created_at: "06/07/2020",
  },
];
export const MockQRType = [
  {
    value: "01",
    desc: "QR merchant",
  },
  {
    value: "02",
    desc: "QR nhan vien",
  },
];
export const MockSettlementDay = [
  {
    value: "01",
    desc: "Day T",
  },
  {
    value: "02",
    desc: "Day T+1",
  },
];
export const MockBank = [
  {
    value: "970415",
    desc: "Ngân hàng TMCP Công thương Việt Nam",
  },
  {
    value: "970416",
    desc: "Ngân hàng TMCP Á Châu",
  },
  {
    value: "970418",
    desc: "Ngân hàng Đầu tư và Phát triển Việt Nam",
  },
  {
    value: "970419",
    desc: "Ngân hàng TMCP Quốc dân",
  },
  {
    value: "970421",
    desc: "Ngân hàng liên doanh Việt Nga",
  },
  {
    value: "970422",
    desc: "Ngân hàng TMCP Quân Đội",
  },
  {
    value: "970423",
    desc: "Ngân hàng TMCP Tiên Phong",
  },
];
export const MockCompanyType = [
  {
    value: "NN",
    desc: "Doanh nghiệp nhà nước",
  },
  {
    value: "DNTN",
    desc: "Doanh nghiệp tư nhân",
  },
  {
    value: "HKDCT",
    desc: "Hộ kinh Doanh cá thể",
  },
  {
    value: "CTCP",
    desc: "Công ty cổ phần",
  },
  {
    value: "TNHH",
    desc: "Công ty Trách nhiệm hữu hạn",
  },
  {
    value: "CTHD",
    desc: "Công ty hợp danh",
  },
  {
    value: "CTLD",
    desc: "Công ty Liên doanh",
  },
];
export const MockBusinessTypeTrue = [
  {
    value: 4815,
    desc: "4815-VisaPhone",
  },
  {
    value: 4821,
    desc: "4821-Telegraph services",
  },
  {
    value: 4829,
    desc: "4829-Money Orders - Wire Transfer",
  },
  {
    value: 4899,
    desc: "4899-Cable and other pay television (previously Cable Services)",
  },
  {
    value: 4900,
    desc: "4900-Electric, Gas, Sanitary and Water Utilities",
  },
];
export const MockMerchantProfile = {
  merchant_id: 100864,
  merchant_biz_name: "Merchant Test 15",
  merchant_code: "MC100864",
  merchant_name: "Merchant Test 15",
  is_master_merchant: 0,
  master_id: null,
  master_name: null,
  agent_phone: "0943222111",
  agent_email: "qcalbawvc@emltmp.com",
  agent_identity: "323443243",
  agent_name: "Huyền",
  company_type: "CTCP",
  business_type: 4899,
  business_type_name:
    "Cable and other pay television (previously Cable Services)",
  tax_code: null,
  address: "HN",
  created_date: "01/07/2020",
  website: null,
  creator_id: 24,
  creator_user: "HuyenPTT",
  creator_via: "MM",
  status: "active",
  status_name: "Active",
  additional_infomation: {
    staff_code: null,
    image_shop: [
      "http://35.223.25.100:8008/vtl-pg/mm/media/merchant/shop-image/4A817B1603B0BB00B6556EC207710E72-1.jpg",
    ],
    address: null,
    agent_identity_image: [
      "http://35.223.25.100:8008/vtl-pg/mm/media/merchant/agent/846C260D715E5B854FFAD5F70A516C88-front.jpg",
      "http://35.223.25.100:8008/vtl-pg/mm/media/merchant/agent/846C260D715E5B854FFAD5F70A516C88-behind.jpg",
    ],
    bsn_registration_cerfiticate:
      "http://35.223.25.100:8008/vtl-pg/mm/media/merchant/bsn-certificate/4A817B1603B0BB00B6556EC207710E72.jpg",
    agency_id: 100010,
    agency_name: "Đại lý phát triển Merchant Hoàng Cầu",
  },
  contract: {
    sign_date: null,
    expire_date: null,
    contract_image: null,
    contract_status: null,
    contract_status_name: null,
    service_status_name: null,
    service_status: null,
  },
  payment_info: {
    settlement_day_display: null,
    settlement_day: null,
    holder_name: null,
    pan: null,
    bank_bin: null,
    bank_name: null,
  },
  payment_method: [
    {
      method_id: 182,
      activated: 1,
    },
  ],
  province: {
    id: "08",
    name: "Tỉnh Tuyên Quang",
  },
  district: {
    id: "073",
    name: "Huyện Chiêm Hóa",
  },
  commune: {
    id: "02305",
    name: "Xã Trung Hà",
  },
};
export const MockSubMerchantList = [
  {
    merchant_id: 100862,
    merchant_biz_name: "Cơm gà",
    merchant_name: "Cơm gà 123",
  },
  {
    merchant_id: 100821,
    merchant_biz_name: "Cơm gà",
    merchant_name: "Cơm gà Hội An",
  },
  {
    merchant_id: 100820,
    merchant_biz_name: "Tocotoco",
    merchant_name: "Trà sữa Tocotoco",
  },
  {
    merchant_id: 100763,
    merchant_biz_name: "Cơm thố ",
    merchant_name: "Cơm thố Bách Khoa",
  },
  {
    merchant_id: 100661,
    merchant_biz_name: "SCTCHL2",
    merchant_name: "Sữa chua trân châu Hạ Long- CS2",
  },
  {
    merchant_id: 100660,
    merchant_biz_name: "SCTCHl1",
    merchant_name: "Sữa chua trân châu Hạ Long CS1",
  },
];
export const MockSubMerchantListBox = [
  {
    value: 100862,
    desc: "Cơm gà 123",
  },
  {
    value: 100821,
    desc: "Cơm gà Hội An",
  },
  {
    value: 100821,
    desc: "Trà sữa Tocotoco",
  },
  {
    value: 100763,
    desc: "Cơm thố Bách Khoa",
  },
  {
    value: 100661,
    desc: "Sữa chua trân châu Hạ Long- CS2",
  },
  {
    value: 100660,
    desc: "Sữa chua trân châu Hạ Long CS1",
  },
];
