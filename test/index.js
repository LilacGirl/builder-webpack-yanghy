const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'))

describe('bulder-webpack test case', () => {
    require('./unit/webpack-base-test')
})