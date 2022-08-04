var Keycloak = require('keycloak-connect');
var keycloakConfig = require('../keycloak_config.json');
let keycloakConn;

function initKeycloak(memStore) {
    if (keycloakConn) {   
        return keycloakConn;
    }

    console.log('Initializing keycloak...');    
    keycloakConn = new Keycloak({store : memStore}, keycloakConfig);
    return keycloakConn;
}

function getKeycloak(params) {
    if (!keycloakConn) {
        console.error('No keycloak connection available');
    }
    return keycloakConn;
}

module.exports = {
    initKeycloak,
    getKeycloak,
}