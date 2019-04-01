const state = require('./stateKKT');

module.exports = (cmd) => {
    switch (cmd.type) {
        case 'openShift':
            state.shiftStatus.state = 'opened';
            break;
        case 'closeShift':
            state.shiftStatus.state = 'closed';
            break;
    }
};