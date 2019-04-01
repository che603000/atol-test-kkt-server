const {
    commandsKKT: {CMD_OPEN_SHIFT},
    statusKKT: {STATUS_READY, STATUS_WAIT, STATUS_ERROR}
} = require('../config');

const {addTask, getInfoTask, resetTask} = require('../src/kkt10-task-emulator');

describe('kkt10-task-emulator', function () {

    it('addTaskSuccess', (done) => {
        addTask('87265863287', CMD_OPEN_SHIFT)
            .then(res => {
                if (res.statusCode === 201)
                    done();
                else
                    done(res);
            })
            .catch(err => done(err))
    });

    it('addTaskError - validate', (done) => {
        addTask('87265863287-1', {
            ...CMD_OPEN_SHIFT,
            debug: {
                validate: {
                    status: STATUS_ERROR,
                    errorCode: 100,
                    errorDescription: 'Ошибка валидации',
                }
            }
        })
            .then(res => done(res))
            .catch(res => {
                if (res.statusCode === 400)
                    done();
                else
                    done(res);
            })
    });

    it('addTaskError-уже есть такая задача', (done) => {
        addTask('87265863287', CMD_OPEN_SHIFT)
            .then(res => done(res))
            .catch(res => {
                if (res.statusCode === 409)
                    done();
                else
                    done(res);
            })
    });

    it('addTaskError- передача ошибочного состояния', (done) => {
        addTask('87265863287-2', {
            ...CMD_OPEN_SHIFT,
            debug: {
                state: {
                    status: STATUS_ERROR,
                    errorCode: 68,
                    errorDescription: "тестоая ошибка",
                    result: 'эмулятор отладка'
                }
            }
        })
            .then(res => {
                if (res.statusCode === 201)
                    done();
                else
                    done(res);
            })
            .catch(err => done(err))
    });

    it('getTaskSuccess - wait', (done) => {
        getInfoTask('87265863287')
            .then(res => {
                if (res.statusCode === 200) {
                    if (res.results[0].status !== STATUS_WAIT)
                        done(res);
                    done();
                } else
                    done(res);
            })
            .catch(err => done(err))
    });

    it('getTaskError - validate', (done) => {
        getInfoTask('87265863287-1')
            .then(res => {
                if (res.statusCode === 200) {
                    if (res.results[0].status !== STATUS_ERROR)
                        done(res);
                    done();
                    console.log(res.results[0])
                    console.log('\n');
                } else
                    done(res);
            })
            .catch(err => done(err))
    });

    it('getTaskSuccess - ready', (done) => {
        setTimeout(() => {
            getInfoTask('87265863287')
                .then(res => {
                    if (res.statusCode === 200) {
                        if (res.results[0].status !== STATUS_READY)
                            done(res);
                        done();
                    } else
                        done(res);
                })
                .catch(err => done(err))
        }, 3000);

    }).timeout(5000);

    it('getTaskError - проверка ошибочного состояния', (done) => {
        setTimeout(() => {
            getInfoTask('87265863287-2')
                .then(res => {
                    if (res.statusCode === 200) {
                        if (res.results[0].status !== STATUS_ERROR)
                            done(res);
                        done();
                        console.log(res.results[0]);
                        console.log('\n');
                    } else
                        done(res);

                })
                .catch(err => done(err))
        }, 100);

    }).timeout(5000);

    it('resetTask', () => {
        if (Object.keys(resetTask()).length !== 0) {
            throw 'reset error'
        }
    });

});

