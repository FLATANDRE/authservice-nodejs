var express = require('express');
const {KcAdminClient} = require('@keycloak/keycloak-admin-client');
const KeycloakService = require('../service/keycloak-service');
const AuthService = require('../service/auth-service');
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const kcService = new KeycloakService(new KcAdminClient());
const authService = new AuthService(kcService);

router.get('/token', function(req, res){
    const token =  authService.login('a','aa');
    res.send(token);
});

router.get('/user-info', keycloak.protect('user'), function(req, res){
    const userInfo = authService.getUserInfo('a');
    res.send(userInfo);
});

router.get('/logout', keycloak.protect('user'), function(req, res){
    const isLoggedOut = authService.logout();
    res.send(isLoggedOut);    
});

module.exports = router;