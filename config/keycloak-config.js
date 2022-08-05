var Keycloak = require('keycloak-connect');
const { isProduction } = require('../util/env-functions');

let keycloakConn;

function initKeycloak(memStore) {
    if (keycloakConn) {   
        return keycloakConn;
    }

    console.log('Initializing keycloak...');    
    keycloakConn = new Keycloak({store : memStore}, chekEnvConfig());
    return keycloakConn;
}

function getKeycloak(params) {
    if (!keycloakConn) {
        console.error('No keycloak connection available');
    }
    return keycloakConn;
}

function chekEnvConfig() {
    if (isProduction()) {
        return require('../keycloak_config.prod.json');
    }
    return require('../keycloak_config.dev.json');
}

module.exports = {
    initKeycloak,
    getKeycloak,
}