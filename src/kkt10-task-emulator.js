const {
    statusKKT: {STATUS_WAIT, STATUS_NET_ERROR, STATUS_PROGRESS, STATUS_READY, STATUS_ERROR}
} = require('../config');

const handlerCmd= require('./handler-result');
const handlerState= require('./handler-state');


let store = {};

const validate = (opt) => {
    const {debug = {}} = opt;
    return debug.validate;
};

const addTask = (uuid, cmdOptions) => new Promise((resolve, reject) => {
    if (store[uuid])
        return reject({statusCode: 409}); // уже есть задача
    const err = validate(cmdOptions);
    if (err) {
        store[uuid] = {
            cmd: cmdOptions,
            state: {
                status: STATUS_ERROR,
                errorCode: 100,
                errorDescription: validate(cmdOptions),
                result: null,
                ...err
            }
        };
        return reject({statusCode: 400});
    }
    handlerState(cmdOptions);
    store[uuid] = {
        cmd: cmdOptions,
        state: {
            status: STATUS_WAIT,
            errorCode: null,
            errorDescription: null,
            result: null
        }
    };
    resolve({statusCode: 201})
});

const getInfoTask = (uuid) => new Promise((resolve, reject) => {
    if (!store[uuid])
        return reject({
            statusCode: 404,
            results: [{status: STATUS_ERROR, errorDescription: 'задание с заданным uuid не найдено'}]
        });

    return resolve({statusCode: 200, results: [store[uuid].state]});
});

const resetTask = () => store = {};

const loopTask = () => {
    setInterval(() => {
        Object.keys(store)
            .map(key => store[key])
            .filter(item => [STATUS_NET_ERROR, STATUS_WAIT, STATUS_PROGRESS].some(status => status === item.state.status))
            .forEach((item, index) => {
                const debugState = item.cmd.debug && item.cmd.debug.state;

                if (debugState)
                    item.state = debugState;
                else
                    item.state = handlerCmd(item.cmd);
            });
    }, 2000);
};

loopTask();

module.exports = {
    addTask,
    getInfoTask,
    resetTask
};