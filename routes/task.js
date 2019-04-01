const express = require('express');
const router = express.Router();
const {addTask, getInfoTask, resetTask} = require('../src/kkt10-task-emulator');

const {commandsKKT} = require('../config');
//const {CMD_CHECK_SELL, CMD_CLOSE_SHIFT, CMD_OPEN_SHIFT} = commandsKKT;


router.get('/requests/reset', (req, res, next) => {
    resetTask();
    res.json();
});

router.get('/requests/:uuid', (req, res, next) => {
    const {uuid} = req.params;
    getInfoTask(uuid)
        .then(data => {
            res.status(data.statusCode);
            res.send(JSON.stringify(data));
        })
        .catch((data) => {
            res.status(data.statusCode);
            res.send(JSON.stringify(data));
        });

});

router.post('/requests', (req, res, next) => {
    const {uuid, request} = req.body;

    addTask(uuid, request)
        .then(({statusCode}) => {
            res.status(statusCode);
            res.end();
        })
        .catch(({statusCode}) => {
            res.status(statusCode);
            res.end();
        });
});

module.exports = router;