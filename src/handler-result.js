const {statusKKT: {STATUS_READY}} = require('../config');
const state = require('./stateKKT');

module.exports = cmd => {
    switch (cmd.type) {
        case 'openShift':
            return {
                status: STATUS_READY,
                errorCode: 0,
                errorDescription: "Ошибок нет",
                result: {
                    "fiscalParams": {
                        "fiscalDocumentDateTime": "2017-07-25T13:16:00+03:00",
                        "fiscalDocumentNumber": 70,
                        "fiscalDocumentSign": "0024109209",
                        "fnNumber": "9999078900000961",
                        "registrationNumber": "0000000001002292",
                        "shiftNumber": 12,
                        "fnsUrl": "www.nalog.ru"
                    },
                    "warnings": {
                        "notPrinted": true
                    }
                }
            };
        case 'closeShift':
            return {
                status: STATUS_READY,
                errorCode: 0,
                errorDescription: "Ошибок нет",
                result: {
                    "fiscalParams" : {
                        "fiscalDocumentDateTime" : "2017-07-25T13:12:00+03:00",
                        "fiscalDocumentNumber" : 69,
                        "fiscalDocumentSign" : "1138986989",
                        "fnNumber" : "9999078900000961",
                        "registrationNumber" : "0000000001002292",
                        "shiftNumber" : 11,
                        "receiptsCount" : 3,
                        "fnsUrl": "www.nalog.ru"
                    },
                    "warnings": {
                        "notPrinted": false
                    }
                }
            };
        case 'getShiftStatus':
            return {
                status: STATUS_READY,
                errorCode: 0,
                errorDescription: "Ошибок нет",
                result: {
                    shiftStatus : state.shiftStatus
                    }
                };
        case 'sell':
            return {
                status: STATUS_READY,
                errorCode: 0,
                errorDescription: "Ошибок нет",
                result:{
                    "fiscalParams" : {
                        "fiscalDocumentDateTime" : "2018-03-06T13:52:00+03:00",
                        "fiscalDocumentNumber" : 71,
                        "fiscalDocumentSign" : "1494325660",
                        "fiscalReceiptNumber" : 1,
                        "fnNumber" : "9999078900000961",
                        "registrationNumber" : "0000000001002292",
                        "shiftNumber" : 12,
                        "total" : 390.75,
                        "fnsUrl": "www.nalog.ru"
                    },
                    "warnings": null
                }
            }
        default:
            return {
                status: STATUS_READY,
                errorCode: 0,
                errorDescription: "Ошибок нет",
                result: 'эмулятор отладка'
            };
    }
};