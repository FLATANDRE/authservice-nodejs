function isProduction() {
    return process.env.NODE_ENV === 'production';
}

function getEnvironment() {
    return process.env.NODE_ENV;
}

module.exports = {
    isProduction,
    getEnvironment,
}