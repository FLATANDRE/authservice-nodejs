var express = require('express');
const KeycloakService = require('../service/keycloak-service');
const AuthService = require('../service/auth-service');
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const kcService = new KeycloakService();
const authService = new AuthService(kcService);

router.get('/token', function(req, res){
    const {username,password} = req.query;
    authService
        .login(username,password)
        .then(token => {
            res.send(token);
        });    
});

router.get('/user-info', keycloak.protect('user'), function(req, res){
    authService
        .getUserInfo(req.headers.authorization)
        .then(user => {
            res.send(user);
        });
});

router.get('/logout', keycloak.protect('user'), function(req, res){
    authService
    .logout(req.headers.authorization,req.query.idToken)
    .then(user => {
        res.send(user);
    });
});

module.exports = router;