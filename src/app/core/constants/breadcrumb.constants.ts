export const BREADCRUMB_CONFIG = [
  {
    id: 1,
    name: "Home",
    icon: "dashboard",
    url: "/admin/dashboard",
    parentId: undefined,
  },
  {
    id: 2,
    name: "breadcrumb.usermanage",
    url: "/admin/user",
    icon: "account_box",
    children: [
      {
        id: 4,
        name: "breadcrumb.detail",
        url: "/admin/user/detail",
        parentId: 2,
      },
    ],
  },
  {
    id: 5,
    name: "left-menu.report.title",
    url: null,
    icon: " insert_chart_outlined",
    children: [
      {
        id: 6,
        name: "left-menu.report.revenue",
        url: "/admin/report/revenue-report",
        parentId: 5,
        icon: "monetization_on",
      },
      {
        id: 7,
        name: "left-menu.report.money-transfer",
        url: "/admin/report/money-transfer-report",
        parentId: 5,
        icon: "forward",
      },
      {
        id: 8,
        name: "left-menu.report.finalization",
        url: "/admin/report/finalization-report",
        parentId: 5,
        icon: "sync",
      },
      {
        id: 9,
        name: "left-menu.report.fee",
        url: "/admin/report/fee-report",
        parentId: 5,
        icon: "money",
      },
    ],
  },
  {
    id: 21,
    name: "left-menu.dvcntt-manager.manager",
    url: null,
    icon: "shop",
    children: [
      {
        id: 22,
        name: "left-menu.dvcntt-manager.profile",
        url: "/admin/merchant/profile",
        icon: "work",
        parentId: 21,
      },
      {
        id: 23,
        name: "left-menu.dvcntt-manager.manager-dvcntt",
        url: "/admin/merchant/sub-merchant",
        parentId: 21,
        icon: "broken_image",
        children: [
          {
            id: 231,
            name: "breadcrumb.detail",
            url: "/admin/merchant/sub-merchant/detail",
            parentId: 23,
          },
          {
            id: 232,
            name: "commonAction.add",
            url: "/admin/merchant/sub-merchant/add-new",
            parentId: 23,
          },
        ],
      },
      {
        id: 24,
        name: "left-menu.dvcntt-manager.qrcode",
        url: "/admin/merchant/qrcode",
        icon: "view_comfy",
        parentId: 21,
      },
    ],
  },
  {
    id: 30,
    name: "breadcrumb.profile",
    url: "/profile",
    icon: "account_box",
  },
  {
    id: 31,
    name: "left-menu.transaction.manager",
    url: null,
    icon: "attach_money",
    children: [
      {
        id: 310,
        name: "left-menu.transaction.payment",
        url: "/admin/transaction-payment",
        parentId: 31,
        icon: "payment",
        children: [
          {
            id: 3100,
            name: "breadcrumb.detail",
            url: "/admin/transaction-payment/detail",
            parentId: 310,
          },
        ],
      },
      {
        id: 311,
        name: "left-menu.transaction.refund",
        url: "/admin/transaction-refund",
        parentId: 31,
        icon: "keyboard_return",
        children: [
          {
            id: 3110,
            name: "breadcrumb.detail",
            url: "/admin/transaction-refund/detail",
            parentId: 311,
          },
        ],
      },
    ],
  },
  {
    id: 34,
    name: "service-info.title-main",
    url: "/admin/service-info",
    icon: "local_mall",
  },
  {
    id: 37,
    name: "risks-management.title-main",
    url: null,
    icon: "warning",
    children: [
      {
        id: 38,
        name: "left-menu.ruin-manager.card",
        url: "/admin/risks-blacklist/card",
        parentId: 37,
      },
      {
        id: 39,
        name: "left-menu.ruin-manager.bin",
        url: "/admin/risks-blacklist/bin",
        parentId: 37,
      },
      {
        id: 40,
        name: "left-menu.ruin-manager.business",
        url: "/admin/risks-blacklist/business",
        parentId: 37,
      },
      {
        id: 41,
        name: "left-menu.ruin-manager.account",
        url: "/admin/risks-blacklist/account",
        parentId: 37,
      },
      {
        id: 42,
        name: "left-menu.ruin-manager.transaction",
        url: "/admin/risks-blacklist/transaction",
        parentId: 37,
      },
      {
        id: 43,
        name: "left-menu.ruin-manager.ip",
        url: "/admin/risks-blacklist/ip",
        parentId: 37,
      },
    ],
  },
  {
    id: 47,
    name: "notifications.title",
    url: "/admin/notification",
    icon: "notifications",
    children: [
      {
        id: 48,
        name: "breadcrumb.detail",
        url: "/admin/notification/detail",
        parentId: 47,
      },
    ],
  },
  {
    id: 49,
    name: "left-menu.e-wallet",
    url: null,
    icon: "account_balance_wallet",
    children: [
      {
        id: 491,
        name: "left-menu.wallet-register",
        url: "/admin/e-wallet/wallet-register",
        icon: "account_circle",
        parentId: 49,
      },
      {
        id: 492,
        name: "left-menu.wallet-link",
        url: "/admin/e-wallet/bank-link",
        icon: "account_circle",
        parentId: 49,
      },
      {
        id: 493,
        name: "left-menu.wallet-cashin",
        url: "/admin/e-wallet/cashin",
        icon: "add_box",
        parentId: 49,
      },
      {
        id: 494,
        name: "left-menu.wallet-cashout",
        url: "/admin/e-wallet/cashout",
        icon: "indeterminate_check_box",
        parentId: 49,
      },
      {
        id: 495,
        name: "left-menu.wallet-transfer",
        url: "/admin/e-wallet/transfer",
        icon: "forward",
        parentId: 49,
      },
      {
        id: 496,
        name: "left-menu.wallet-behalf-payment",
        url: "/admin/e-wallet/payment",
        icon: "payment",
        parentId: 49,
      },
    ],
  },
  {
    id: 50,
    name: "left-menu.e-wallet-report.title",
    url: null,
    icon: "insert_chart_outlined",
    children: [
      {
        id: 501,
        name: "left-menu.e-wallet-report.total-wallet",
        url: "/admin/wallet-report/total-wallet",
        icon: "",
        parentId: 50,
      },
      {
        id: 502,
        name: "left-menu.e-wallet-report.total-transaction",
        url: "/admin/wallet-report/total-transaction",
        icon: "",
        parentId: 50,
      },
      {
        id: 502,
        name: "left-menu.e-wallet-report.top-transaction",
        url: "/admin/wallet-report/top-transaction",
        icon: "",
        parentId: 50,
      },
    ],
  },
  {
    id: 13,
    name: "statistic.button",
    icon: "bar_chart",
    url: "/admin/statistic",
  },
  {
    id: 14,
    name: "left-menu.payment-link",
    icon: "link",
    url: "/admin/payment-link",
  },
  {
    id: 15,
    name: "left-menu.payment-link",
    icon: "shop",
    url: "/admin/create-order",
  },
];
