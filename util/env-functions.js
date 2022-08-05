const dotenv = require('dotenv');
dotenv.config();

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

function getEnvironment() {
    return process.env.NODE_ENV;
}


function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = {
    isProduction,
    getEnvironment,
    parseJwt,
}