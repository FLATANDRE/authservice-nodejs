var session = require('express-session');
var keycloak = require('keycloak-connect');

let keycloakConn;

var keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'tech-blog',
    realmPublicKey: '1234567890abcdef'
};

function initKeycloak() {
    if (keycloakConn) {   
        return keycloakConn;
    }

    console.log('Initializing keycloak...');    
    var memStore = new session.MemoryStore();
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