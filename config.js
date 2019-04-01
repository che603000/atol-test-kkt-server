module.exports = {
    commandsKKT: {
        CMD_DEVICE_PARAMETERS: {
            "type": "getDeviceParameters",
            "keys": [273, 274, 9999, 49, 50]
        },
        CMD_STATUS_OFD: {
            type: "ofdExchangeStatus"
        },
        CMD_OPEN_SHIFT: {
            "type": "openShift",

            "operator": {
                "name": "auto",
            },
        },
        CMD_CLOSE_SHIFT: {
            "type": "closeShift",

            "operator": {
                "name": "auto",
            },
        },
        CMD_CHECK_SELL: (options) => ({ //options ={userName, sum, role, orderId }
            "type": "sell",
            "taxationType": "usnIncome",
            "electronically": true,
            "companyInfo": {
                email: 'fplnru@gmail.com'
            },
            "operator": {
                "name": "auto"
            },
            "clientInfo": {
                "emailOrPhone": `${options.userName}`
            },
            "paymentsPlace": "https://fpln.ru",
            "items": [
                {
                    "type": "position",
                    "name": `Расширенный доступ к сайту https://fpln.ru. Статус: [${options.role}]`,
                    "price": options.sum,
                    "quantity": 1.0,
                    "amount": options.sum,
                    "paymentMethod": "fullPayment",
                    "paymentObject": "service",
                    "additionalAttribute": `ORDER ID:${options.orderId}`,
                    "piece": true,
                    "tax": {
                        "type": "none"
                    }
                }
            ],
            "payments": [
                {
                    "type": "electronically",
                    "sum": options.sum
                }
            ],
            "total": options.sum
        })
    },
    statusKKT: {
        STATUS_START: 'start',
        STATUS_PENDING: 'pending result cmd',
        STATUS_NET_ERROR: 'net-error',

        STATUS_WAIT: 'wait',
        STATUS_PROGRESS: 'inProgress',
        STATUS_READY: 'ready',
        STATUS_ERROR: 'error',
        STATUS_INTERRUPTED: 'interrupted',
        STATUS_BLOCKED: 'blocked',
        STATUS_CANCELED: 'canceled',

    }
};